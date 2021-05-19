interface IMailDefault {
  from: {
    name: string
    address: string
  }
}
interface IMailConfig {
  driver: 'ethereal' | 'ses'
  config: {
    ethereal: {
      defaults: IMailDefault
    },
    ses: {
      defaults: IMailDefault
    }
  }
}
export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  config: {
    ethereal: {
      defaults: {
        from: {
          name: 'Equipe Ethereal',
          address: 'etherealmail@mail.com',
        }
      }
    },
    ses: {
      defaults: {
        from: {
          name: 'Equipe SES',
          address: 'sesmail@mail.com',
        }
      }
    }
  },

} as IMailConfig

