"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.successTicket = exports.successDeliveryRegister = exports.successOwnerRegister = exports.successRegister = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const BodyMail_1 = __importDefault(require("./BodyMail"));
const CLIENT_ID = process.env.NODEMAILER_CLIENT_ID;
const CLIENT_SECRET = process.env.NODEMAILER_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.NODEMAILER_REFRESH_TOKEN;
const OAuth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
function successRegister(email, name, id) {
    OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    return new Promise((resolve, reject) => {
        const accessToken = OAuth2Client.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
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
        });
        const mailOptions = {
            from: "urbantransportecolombia@gmail.com",
            to: `${email}`,
            subject: "Registro exitoso",
            text: `Hola ${name}, tu registro ha sido exitoso. ¡Bienvenido!`,
            html: (0, BodyMail_1.default)(name, id),
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
                console.log(error);
            }
            else {
                resolve(info);
            }
        });
    });
}
exports.successRegister = successRegister;
function successOwnerRegister(email, displayName) {
    OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    return new Promise((resolve, reject) => {
        const accessToken = OAuth2Client.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
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
        });
        const mailOptions = {
            from: "urbantransportecolombia@gmail.com",
            to: `${email}`,
            subject: "Registro exitoso",
            text: `Hola ${displayName}, has sido registrado como propietario exitosamente!`,
            html: "<p>HTML version of the message</p>",
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
                console.log(error);
            }
            else {
                resolve(info);
            }
        });
    });
}
exports.successOwnerRegister = successOwnerRegister;
function successDeliveryRegister(email, displayName) {
    OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    return new Promise((resolve, reject) => {
        const accessToken = OAuth2Client.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
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
        });
        const mailOptions = {
            from: "urbantransportecolombia@gmail.com",
            to: `${email}`,
            subject: "Registro exitoso",
            text: `Hola ${displayName}, has sido registrado como delivery exitosamente!`,
            html: "<p>HTML version of the message</p>",
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
                console.log(error);
            }
            else {
                resolve(info);
            }
        });
    });
}
exports.successDeliveryRegister = successDeliveryRegister;
function successTicket(email, name) {
    OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    return new Promise((resolve, reject) => {
        const accessToken = OAuth2Client.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
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
        });
        const mailOptions = {
            from: "urbantransportecolombia@gmail.com",
            to: `${email}`,
            subject: "Compra exitoso",
            text: `Hola ${name}, has comprado tu pasaje con exito!`,
            html: "<p>HTML version of the message</p>",
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
                console.log(error);
            }
            else {
                resolve(info);
            }
        });
    });
}
exports.successTicket = successTicket;
