import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    ) {}

  async sendMail(email: string, info: any) {
    return this.mailerService
      .sendMail({
        to: email, // list of receivers
        from: this.configService.get('AWS_SES_MAIL_FROM_ADDRESS'),
        subject: 'EventPlatform: Login details ✔',
        html: `
<p>Here's the login details:</p>
<p>${JSON.stringify(info)}</p>`,
      });
  }
}
