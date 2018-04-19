class MailingController < ApplicationController
  skip_before_action :verify_authenticity_token

  def send_email
    ApplicationMailer.client_email(params['email'], params['subject'], params['message'], params['name'] ).deliver_now
    render json: {status:'sent'}
  end

  def send_appointment_email
    ApplicationMailer.client_appointment_email(params['project'],params['email'], params['phone_number'], params['part'], params['size'], params['name'], params['date'] ).deliver_now
    render json: {status:'sent'}
  end

end
