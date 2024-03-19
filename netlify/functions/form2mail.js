const nodemailer = require("nodemailer");
// const axios = require('axios');

// Input Names to Human readable formatting

const input_names = {
  clientName: "Имя Клиента",
  clientPhone: "Телефон",
  clientMail: "Email",
  clientCompany: "Компания",
  clientPosition: "Должность",
  clientRequest: "Текст сообщения",
  formTitle: "Название формы",
};

exports.handler = async function (event, context, callback) {
  // const today = new Date();
  const page = event.headers.referer;
  const body = JSON.parse(event.body);
  // Build an HTML string to represent the body of the email to be sent.
  // const html = JSON.stringify(body);
  let data_frame = "";
  Object.keys(body).forEach((key) => {
    data_frame += `<tr>
    <td><b>${input_names[key]}</b></td>
    <td>${body[key]}</td>
   </tr>`;
    console.log(key, body[key]);
  });

  data_frame += `<tr>
  <td><b>URL страницы</b></td>
  <td><a href="${page}">${page}</a></td>
 </tr>`;

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
${data_frame}
      </table>
			</center>	
		</body>
	</html>
  `;
  // Generate test SMTP service account from ethereal.email. Only needed if you
  // don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  let text = "<b>Заявка с сайта ITVECTURA.RU</b>\n";
  Object.keys(body).forEach((key) => {
    text += `<b>${input_names[key]}:</b> ${body[key]}\n`;
    console.log(key, body[key]);
  });
  text += `<b>Страница</b>: ${page}`;

  const token = "6245420458:AAEkQx0ziECmtjwz_Nx9sVvHEE99AD3lBBM";
  const chatId = "-1001525366365";
  await fetch(`https://inthemelab.bitrix24.ru/rest/16/rpjxjg0i6t4yb8to/crm.lead.add.json?FIELDS[TITLE]=${body["clientMail"]} /itvectura.ru&FIELDS[NAME]=${body['clientName']}&FIELDS[LAST_NAME]= &FIELDS[EMAIL][0][VALUE]=${body["clientMail"]}&FIELDS[EMAIL][0][VALUE_TYPE]=WORK&FIELDS[PHONE][0][VALUE]=${body["clientPhone"]}&FIELDS[PHONE][0][VALUE_TYPE]=WORK`, {
    method: "GET",
  }).then((response) => {
    console.log(response);
  });

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      parse_mode: "html",
      text: text,
      disable_web_page_preview: true,
    }),
  }).then((response) => {
    console.log(response);
  });

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "alx.helber", // generated ethereal user
      pass: "niajmlxniiyxvbpk", // generated ethereal password
    },
  });

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "alx.helber@yandex.ru",
      to: "info@itvectura.com",
      // to: 'helber-alx@mail.ru',
      subject: "Заявка с сайта itvectura.ru", // ss
      text: "test",
      html: html,
    });
    // Log the result
    console.log(info);
    console.log(JSON.stringify(event));
    callback(null, { statusCode: 200, body: "Отправлено!" });
  } catch (error) {
    // Catch and log error.
    console.log(error);
    callback(error);
  }
};
