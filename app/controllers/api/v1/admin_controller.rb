class Api::V1::AdminController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin


  def index
    # # Gets list of remote files.
    # files = []
    # @session.files.each do |file|
    #   files << {id: file.id, title: file.title}
    # end
    # render json: files, status: :ok
    #
    # # Downloads to a local file.
    # file = session.file_by_title("hello.txt")
    # file.download_to_file("/path/to/hello.txt")
  end

  def create
    unless admin_params[:uploaded]
      begin
        # get the file from the Url to the server hard disk
        url = admin_params[:url]
        time = Time.now.to_i.to_s
        file_name = "#{time}_img.#{url.split(".").last}"
        file_path = "./tmp/uploads/#{file_name}"
        myfile = IO.sysopen(file_path,"wb+")
        tmp_img = IO.new(myfile,"wb")
        tmp_img.write open(URI.encode(url)).read
        folder = "instruments/"


        # if File.exist?("tmp/"+time+"_img."+url.split(".").last)
        #   "tmp/"+time+"_img."+url.split(".").last
        #   image = ActionDispatch::Http::UploadedFile.new(:tempfile => tmp_img, :filename => File.basename(tmp_img))
        # else
        #   image=nil
        # end
        # @your_model.image=image
        # @your_model.save

        s3 = Aws::S3::Resource.new
        bucket = s3.bucket(ENV.fetch('S3_BUCKET'))
        obj = bucket.object("#{folder}#{file_name}")
        obj.upload_file(file_path, { acl: 'public-read' })
      ensure
        File.delete(file_path)
      end
    end
    # instrument = Instrument.find(params[:id])
    # instrument.picture_url = obj.public_url
    # instrument.save

    # to delete
    # obj.delete

    # render json: uploader.url, status: :ok
    render json: {msg: "File uploaded to S3 #{obj.public_url}"}, status: :ok
  end

  private

  def authenticate_admin
    render json: {error: "Not authorised to do this action"}, status: :unprocessable_entity  unless current_user.admin
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def admin_params
    params.require(:admin).permit(:url, :file_name, :uploaded)
  end
end
