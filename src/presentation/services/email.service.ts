import nodemailer, { Transporter } from "nodemailer";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments {
  filename: string;
  path: string;
}

export class EmailSender {
  private transporter: Transporter;

  constructor(
    mailserService: string,
    mailerEmail: string,
    senderEmailPassword: string,
    private readonly postToProvider: boolean //* Property for send email validations
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailserService,
      auth: {
        user: mailerEmail,
        pass: senderEmailPassword,
      },
    });
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      if (!this.postToProvider) return true; //* We dont send email verificacion

      this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
