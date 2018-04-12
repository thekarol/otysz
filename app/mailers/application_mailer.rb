class ApplicationMailer < ActionMailer::Base
  default from: "customer@example.com"

  def client_email(email, subject, message, name)

    @email = email
    @message = message
    @name = name

    mail(to: 'otyszecki.kontakt@gmail.com', subject: subject)

  end
end