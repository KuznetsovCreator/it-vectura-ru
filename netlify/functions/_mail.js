const nodemailer = require("nodemailer");

const success_msgs = {'RU': 'Ваше сообщение отправлено!', 'EN': 'Sent'};
const error_msgs = {'RU': 'Ошибка сервера', 'EN': 'Error'}

exports.handler = async function (event, context, callback) {
  const today = new Date();
  const page = event.headers.origin;
  const body = JSON.parse(event.body);
  // Build an HTML string to represent the body of the email to be sent.
  const html = `
  <html>
		<body>
			<center>	
				<table border=1 cellpadding=6 cellspacing=0 width=350 bordercolor="#01426A">
	 			<tr>
					<td colspan=2 align=center bgcolor="#E9F0F6">
						<b>Пользовательская информация</b>
					</td>
				</tr>
	 			<tr>
					<td><b>С сайта</b></td>
					<td>${page}</td>
	 			</tr>
	 			<tr>
					<td><b>E-mail</b></td>
					<td><a href="mailto:${body.clientMail}">${body.clientMail}</a></td>
	 			</tr>
	 			<tr>
					<td><b>Имя</b></td>
					<td>${body.clientName}</td>
	 			</tr>
	 			<tr>
					<td><b>Вопрос</b></td>
					<td>${body.clientRequest}</td>
	 			</tr>
	 			<tr>
	 				<td><b>Дата</b></td>
	 				<td>${today}</td>
				</tr>
				<tr>
					<td><b>Версия сайта</b></td>
					<td>${body.clientLang}</td>
				</tr>
				</table>
			</center>	
		</body>
	</html>';
  `;

  // Generate test SMTP service account from ethereal.email. Only needed if you
  // don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'alx.helber', // generated ethereal user
      pass: 'niajmlxniiyxvbpk', // generated ethereal password
    },
  });

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'alx.helber@yandex.ru',
      // to: 'info@itvectura.com',
      to: 'helber-alx@mail.ru',
      subject: 'Заявка с сайта itvectura.com',
      text: 'test',
      html: html,
    });
    // Log the result
    console.log(info);
    callback(null, { statusCode: 200, body: success_msgs[body.clientLang]});
  } catch (error) {
    // Catch and log error.
    callback(error);
  }
};