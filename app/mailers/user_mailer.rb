class UserMailer < ActionMailer::Mailer
  default from: "no-reply@otyszewski.com"

  def send(user_email, subject)
    mail(:to => 'thekkarol@gmail.com', :subject => subject + 'From : ' + user_email)
  end
end