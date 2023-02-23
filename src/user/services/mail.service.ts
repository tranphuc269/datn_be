import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailInput } from '../dtos/mail.dto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'chung.develete@gmail.com', // your email address
        pass: 'rmnfkfaswuypzcwg', // your email password
      },
    });
  }

  async sendMail(input: MailInput) {
    const mailOptions = {
      from: 'chung.lnt20062000@gmail.com',
      to :input.email,
      subject: input.subject,
      text: input.message,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
