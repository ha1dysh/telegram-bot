import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { GptService } from 'src/gpt/gpt.service';
import { Scenes, Telegraf } from 'telegraf';

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context> {
  constructor(private readonly gptService: GptService) {
    super('');
  }

  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.replyWithHTML(`<b>Hello there, ${ctx.from.username}</b>`);
  }

  @On('text')
  onMessage(@Message('text') msg: string) {
    if (!msg.includes('-Q')) {
      return;
    }

    return this.gptService.gptResponse(msg.slice(3));
  }
}
