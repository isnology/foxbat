class Api::V1::InstrumentsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update]
  before_action :authenticate_admin, only: [:create, :update]
  
  def index
    #render json: Instrument.includes(:instrument_class).all, status: :ok
    render json: serializer(Instrument.all), status: :ok
  end
  
  def create
    copy_params = instrument_params.clone
    upload_picture(copy_params)
    instrument = Instrument.includes(:instrument_class).new(copy_params)
    if instrument.save
      #render json: instrument, status: :created
      render json: serializer(instrument), status: :created
    else
      render json: instrument.errors, status: :unprocessable_entity
    end
  end
  
  def update
    instrument = Instrument.includes(:instrument_class).find(params[:id])
    copy_params = instrument_params.clone
    upload_picture(copy_params) unless instrument.uploaded
    if instrument.update(copy_params)
      #render json: instrument, status: :ok
      render json: serializer(instrument), status: :ok
    else
      render json: instrument.errors, status: :unprocessable_entity
    end
  end
  
  private
  
  def serializer(object)
    Api::V1::InstrumentSerializer.new(object).as_json
  end
  
  # Never trust parameters from the scary internet, only allow the white list through.
  def instrument_params
    params.require(:instrument).permit(
      :name,
      :brand,
      :model,
      :part_no,
      :text,
      :picture_url,
      :uploaded,
      :price,
      :size,
      :picture_h_offset,
      :picture_v_offset,
      :picture_width,
      :picture_height,
      :instrument_class_id)
  end

  def authenticate_admin
    render json: {error: "Not authorised to do this action"}, status: :unprocessable_entity  unless current_user.admin
  end
  
  def upload_picture(attributes)
    # get the file from the Url to the server hard disk
    url = attributes[:picture_url]
    time = Time.now.to_i.to_s
    file_name = "#{time}_img.#{url.split(".").last}"
    file_path = "./tmp/uploads/#{file_name}"
    myfile = IO.sysopen(file_path,"wb+")
    tmp_img = IO.new(myfile,"wb")
    tmp_img.write open(URI.encode(url)).read
    
    s3 = Aws::S3::Resource.new
    bucket = s3.bucket(ENV.fetch('S3_BUCKET'))
    folder = "instruments/"
    obj = bucket.object("#{folder}#{file_name}")
    obj.upload_file(file_path, { acl: 'public-read' })
    attributes[:picture_url] = obj.public_url
    attributes[:uploaded] = true
  ensure
    File.delete(file_path)
  end
end
