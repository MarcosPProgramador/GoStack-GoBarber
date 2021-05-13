interface IMailConfig {
  driver: 'ethereal' | 'ses'
  defaults: {
    from: {
      name: string
      address: string
    }
  }
}
export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      name: 'Equipe GoBarber',
      address: 'marcosproenca@gmail.com',
    }
  }
} as IMailConfig

