class MailingController < ApplicationController
  skip_before_action :verify_authenticity_token

  def send_email
    ApplicationMailer.client_email(params['email'], params['subject'], params['message'], params['name'] ).deliver_now
    render json: {status:'sent'}
  end

end
