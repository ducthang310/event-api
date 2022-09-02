import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import EnvironmentVariables from '../../common/interfaces/configuration.interface';
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';

@Module({
  providers: [NotificationService],
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        const from = configService.get('AWS_SES_MAIL_FROM_ADDRESS');
        const sender = configService.get('AWS_SES_MAIL_FROM_NAME');
        return {
          transport: {
            SES: {
              ses: new SESClient({ region: configService.get('AWS_REGION') }),
              aws: { SendRawEmailCommand},
            },
          },
          defaults: {
            from: `"${sender}" <${from}>`,
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new PugAdapter(),
            options: {
              strict: true,
            },
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
