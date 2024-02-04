import * as dotenv from 'dotenv';
dotenv.config();

import { BotCore } from './core/BotCore';

const botCore = new BotCore(process.env.TELEGRAM_BOT_TOKEN || '');
botCore.start();
