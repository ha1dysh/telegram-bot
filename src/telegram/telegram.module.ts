import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GptService } from 'src/gpt/gpt.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('TG_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TelegramService, GptService],
})
export class TelegramModule {}
