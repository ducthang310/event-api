import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AccountModule } from '../account/account.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_EXPIRES_IN_SECONDS_DEFAULT_VALUE } from './constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: Number(
            configService.get(
              'JWT_EXPIRES_IN_SECONDS',
              JWT_EXPIRES_IN_SECONDS_DEFAULT_VALUE,
            ),
          ),
        },
      }),
      inject: [ConfigService],
    }),
    NotificationModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
