import { EmailClient } from "@azure/communication-email";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import dotenv from "dotenv";

dotenv.config();

const connectionString = "endpoint=https://restablecer-contrasena.unitedstates.communication.azure.com/;accesskey=3Stfxty5fOVTHDDyeNysPnNacFK6xEXHEAhM8A4loqxLOZXJteKJJQQJ99ALACULyCps5mg0AAAAAZCSNdnB";
const client = new EmailClient(connectionString);

const senderAddress = "DoNotReply@64f04cf5-631e-4595-9c6e-46dea4aee9bc.azurecomm.net";
if (!senderAddress) {
  throw new Error("El remitente (AZURE_SENDER_ADDRESS) no está configurado.");
}

const emailTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código de verificación TatSoft</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f7f7f7;
        color: #333333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px solid #eeeeee;
      }
      .logo {
        max-width: 150px;
        height: auto;
      }
      .content {
        padding: 30px 20px;
        text-align: center;
      }
      .code-container {
        margin: 30px 0;
        padding: 20px;
        background-color: #f8f8f8;
        border-radius: 6px;
        border-left: 4px solid #F78220;
      }
      .verification-code {
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 5px;
        color: #F78220;
      }
      .message {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 25px;
        color: rgb(27, 27, 27)
      }
      .footer {
        text-align: center;
        padding-top: 20px;
        color: #777777;
        font-size: 14px;
        border-top: 1px solid #eeeeee;
      }
      .button {
        display: inline-block;
        background-color: #F78220;
        color: white;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 4px;
        font-weight: bold;
        margin-top: 15px;
      }
      .support {
        margin-top: 25px;
        font-size: 14px;
        color:rgb(27, 27, 27);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img class="logo" src="https://funcion141195adso.blob.core.windows.net/productimg/Tatsoft%20o.png?sp=r&st=2025-03-21T01:16:51Z&se=2025-03-21T09:16:51Z&spr=https&sv=2024-11-04&sr=b&sig=3xHYCkl5z3fA9gdUgzqeKE2PAodDgsGFw3aH%2FCdsYJ4%3D" alt="TatSoft Logo">
      </div>
      <div class="content">
        <h2 style="color: #F78220;">Restablecimiento de contraseña</h2>
        <p class="message">Hola,<br>Has solicitado restablecer tu contraseña. Utiliza el siguiente código de verificación para completar el proceso:</p>
  
        <div class="code-container">
          <div class="verification-code">{{code}}</div>
        </div>
  
        <p class="message">Este código expirará en 10 minutos por razones de seguridad.</p>
  
        <p class="message">Si no solicitaste este cambio, puedes ignorar este correo o contactar a nuestro equipo de soporte.</p>
  
        <p class="support">¿Necesitas ayuda? Contáctanos a <a href="mailto:tatsoftsoporte@gmail.com" style="color: #F78220;">soporte@tatsoft.com</a></p>
      </div>
      <div class="footer">
        <p>&copy; 2025 TatSoft. Todos los derechos reservados.</p>
        <p>Este es un correo electrónico automático, por favor no responda a este mensaje.</p>
      </div>
    </div>
  </body>
  </html>
`;

export const sendEmail = async (to: string, subject: string, code: string) => {
  console.log('entro a sendEmail');
  
  try {
    // Cargar y compilar la plantilla HTML
    //const templatePath = path.join(__dirname, "../templates/verificationTemplate.html");
    const template = Handlebars.compile(emailTemplate);
    const html = template({ code });

    // Configurar el mensaje de correo electrónico
    const emailMessage = {
      senderAddress: "DoNotReply@64f04cf5-631e-4595-9c6e-46dea4aee9bc.azurecomm.net",
      content: { subject, html },
      recipients: { to: [{ address: to }] },
    };

    try {
      // Enviar el correo
      const poller = await client.beginSend(emailMessage);
      await poller.pollUntilDone();
      console.log("Email enviado correctamente");
    } catch (error) {
      console.error("Error enviando correo en sendEmail:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw error;
  }
};
