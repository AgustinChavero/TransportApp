"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (req, res) => {
    try {
        const mailTo = req.body.mailTo;
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: "kaden.purdy@ethereal.email",
                pass: "PqaNEjsksQHMWFd3v9",
            },
        });
        const mailOptions = {
            from: "Remitente",
            to: mailTo,
            subject: "Test",
            text: "Test",
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error("error al mandar el mail");
            }
            else {
                res.status(200).json(req.body);
            }
        });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};
exports.sendMail = sendMail;
