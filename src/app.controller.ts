import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import EnvironmentVariables from './common/interfaces/configuration.interface';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  @Public()
  @Get()
  home(): string {
    return 'App name: ' + this.configService.get('APP_NAME');
  }
}
