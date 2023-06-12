import { google } from "googleapis";
import nodemailer from "nodemailer";
import BodyHtml from './BodyMail';

const CLIENT_ID = process.env.NODEMAILER_CLIENT_ID;
const CLIENT_SECRET = process.env.NODEMAILER_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.NODEMAILER_REFRESH_TOKEN;

const OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export function successRegister(email: string, name: string, id: string): Promise<any> {
  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  return new Promise((resolve, reject) => {
    const accessToken = OAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "urbantransportecolombia@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
        expires: 3600,
      },
      tls: {
        rejectUnauthorized: false,
      },
    } as any);

    const mailOptions = {
      from: "urbantransportecolombia@gmail.com",
      to: `${email}`,
      subject: "Registro exitoso",
      text: `Hola ${name}, tu registro ha sido exitoso. ¡Bienvenido!`,
      html: BodyHtml(name, id),
    };

    transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
      if (error) {
        reject(error);
        console.log(error);
      } else {
        resolve(info);
      }
    });
  });
}

export function successOwnerRegister(email: string, displayName: string): Promise<any> {
  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  return new Promise((resolve, reject) => {
    const accessToken = OAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "urbantransportecolombia@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
        expires: 3600,
      },
      tls: {
        rejectUnauthorized: false,
      },
    } as any);

    const mailOptions = {
      from: "urbantransportecolombia@gmail.com",
      to: `${email}`,
      subject: "Registro exitoso",
      text: `Hola ${displayName}, has sido registrado como propietario exitosamente!`,
      html: "<p>HTML version of the message</p>",
    };

    transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
      if (error) {
        reject(error);
        console.log(error);
      } else {
        resolve(info);
      }
    });
  });
}

export function successDeliveryRegister(email: string, displayName: string): Promise<any> {
  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  return new Promise((resolve, reject) => {
    const accessToken = OAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "urbantransportecolombia@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
        expires: 3600,
      },
      tls: {
        rejectUnauthorized: false,
      },
    } as any);

    const mailOptions = {
      from: "urbantransportecolombia@gmail.com",
      to: `${email}`,
      subject: "Registro exitoso",
      text: `Hola ${displayName}, has sido registrado como delivery exitosamente!`,
      html: "<p>HTML version of the message</p>",
    };

    transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
      if (error) {
        reject(error);
        console.log(error);
      } else {
        resolve(info);
      }
    });
  });
}

export function successTicket(email: string, name: string): Promise<any> {
  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  return new Promise((resolve, reject) => {
    const accessToken = OAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "urbantransportecolombia@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
        expires: 3600,
      },
      tls: {
        rejectUnauthorized: false,
      },
    } as any);

    const mailOptions = {
      from: "urbantransportecolombia@gmail.com",
      to: `${email}`,
      subject: "Compra exitoso",
      text: `Hola ${name}, has comprado tu pasaje con exito!`,
      html: "<p>HTML version of the message</p>",
    };

    transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
      if (error) {
        reject(error);
        console.log(error);
      } else {
        resolve(info);
      }
    });
  });
}
