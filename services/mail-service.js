const nodemailer = require('nodemailer');
class MailService {
  //ініціалізуємо поштовий клієнт
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, //хост поштового сервера
      port: process.env.SMTP_PORT,
      secure: false,
      auth: { // авторизаційні дані акаунта відправника
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      //Todo при деплої замінити API_URL
      subject: `Активація акаунта на ${process.env.API_URL}`,
      text: '',
      html:
        `
          <div>
            <h1>Для активації, перейдіть будь ласка за посиланням</h1>
            <a href="${link}">${link}</a>
          </div>
        `
    });
  }
}

module.exports = new MailService();
