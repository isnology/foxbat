class Api::V1::SubmitpanelController < ApplicationController
  before_action :authenticate_user!

  def create
    from_email = params[:email]
    slots = params[:slots]
    template = params[:template]
    template_slots = params[:templateSlots]
   
    template_slots.each do |slot|
      if slots[slot]
        instrument = Instrument.includes(:instrument_class).find(slots[slot])
        slots[slot] = instrument
      end
    end

    Api::V1::PanelMailer.panel_email(from_email, template, template_slots, slots).deliver_now
    render json: 'OK', status: :ok
  end
end
