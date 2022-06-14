import nodemailer from 'nodemailer'
import {MailAdapter, SendMailData} from '../mail-adapter'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "871ba3d1d66244",
    pass: "f687759a835801"
  }
}); 

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Leander Silveira <vitor_lima2@outlook.com>',
        subject,
        html: body
    })
    }
}
