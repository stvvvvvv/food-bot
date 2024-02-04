import TelegramBot, { Message } from 'node-telegram-bot-api';
import { Command } from './Command';

export class StartCommand extends Command {
	constructor() {
		super('/start', 'Start the bot and show the menu');
	}

	handle(msg: TelegramBot.Message, bot: TelegramBot): boolean {
		return true
	}
	execute(msg: Message, bot: TelegramBot): void {
		const chatId = msg.chat.id;

		const options = {
			reply_markup: {
				inline_keyboard: [
					[{ text: 'Set Nutrition Data', callback_data: '/set_nutrition' }],
					[{ text: 'Get Daily Menu', callback_data: '/get_daily_menu' }]
				]
			}
		};

		bot.sendMessage(chatId, 'Welcome! Choose an option:', options);
	}
}
