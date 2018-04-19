class ApplicationMailer < ActionMailer::Base
  default from: "customer@example.com"

  def client_email(email, subject, message, name)

    @email = email
    @message = message
    @name = name

    mail(to: 'otyszecki.kontakt@gmail.com', subject: subject)

  end

  def client_appointment_email(project, email, phone_number, part, size, name, date)

    @email = email
    @phone_number = phone_number
    @size = size
    @part = part
    @name = name
    @project = project
    @date = date

    mail(to: 'otyszecki.kontakt@gmail.com', subject: name)

  end
end