import { createTestAccount, getTestMessageUrl, Transporter, createTransport } from 'nodemailer'
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider'

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private transporter: Transporter
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    createTestAccount().then(account => {
      const transporter = createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })
      this.transporter = transporter
    })

  }
  async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const message = await this.transporter.sendMail({
      to: {
        name: to.name,
        address: to.address
      },
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.address || 'gobarber@platform.com.br'
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })
    console.log(message.messageId)
    console.log(getTestMessageUrl(message))
  }
}

