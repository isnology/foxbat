class Api::V1::PanelMailer < ApplicationMailer
  default from: 'notifications@foxbat.com'
  
  def panel_email(from_email, template, template_slots, slots)
    @from_email = from_email
    @template = template
    @template_slots = template_slots
    @slots = slots
    support_email = ENV.fetch('SUPPORT_EMAIL')
    mail(to: support_email, subject: "Panel layout from #{@from_email}")
  end
end
