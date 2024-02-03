import TelegramBot from 'node-telegram-bot-api';
import { MessageHandler } from './MessageHandler';

export class BotCore {
    private bot: TelegramBot;
    private messageHandler: MessageHandler;

    constructor(token: string) {
        this.bot = new TelegramBot(token, { polling: true });
        this.messageHandler = new MessageHandler();
    }

    start(): void {
        this.bot.on('message', (msg) => {
            this.messageHandler.handle(msg, this.bot);
        });
    }
}
