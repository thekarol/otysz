class ApplicationMailer < ActionMailer::Base
  default from: "customer@example.com"

  def client_email(email, subject, message, name)

    @email = email
    @message = message
    @name = name

    mail(to: 'thekkarol@gmail.com', subject: subject)

  end
end