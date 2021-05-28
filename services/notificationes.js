const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const notifications = {

sendEmail: async (user, sandboxMode = false) => {
		const msg = {
			to:user.email,
			from: process.env.SENDGRID_EMAIL_FROM,
			subject: 'Bienvenido a MercadoLiebre',
			text: 'mercadoLiebre te da la bienvenida a bordo de MeracadoLiebre',
			html:`<strong>bienvenido a bordo ${user.name}</strong><br><strong>https://ecomerce-dh-matias-davila.herokuapp.com/user/login</strong>`,
			mail_settings: {
				sandbox_mode: {
					enable: sandboxMode
				}
			}
		};
		try {
			await sgMail.send(msg);
		} catch (err) {
            console.log(err.message)
			return err;
		}
        console.log('email enviado con exito')
		return user;

	}
}

module.exports = notifications;