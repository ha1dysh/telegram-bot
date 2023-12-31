import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.GPT_KEY });
  }

  async gptResponse(message: string) {
    const res = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      max_tokens: 2000,
    });

    return res.choices[0].message.content;
  }
}
