import nodemailer from "nodemailer";
import { Request, Response } from "express";

export const sendMail = (req: Request, res: Response): void => {
  try {
    const mailTo = req.body.mailTo;

    const transporter = nodemailer.createTransport({
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
      } else {
        res.status(200).json(req.body);
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
