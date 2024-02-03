import TelegramBot, { Message } from 'node-telegram-bot-api';

export class MessageHandler {
	handle(msg: Message, bot: TelegramBot): void {
		const chatId = msg.chat.id;
		bot.sendMessage(chatId, "Привет, я твой бот!");
	}
}
