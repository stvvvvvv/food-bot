import TelegramBot, { Message } from 'node-telegram-bot-api';
import { Command } from './Command';
import { UserStateManager } from '../core/UserStateManager';

export class SetNutritionCommand extends Command {
	constructor() {
		super('/set_nutrition', 'Set your macros (Proteins, Fats, Carbs, Calories)');
	}

	handle(msg: TelegramBot.Message, bot: TelegramBot): boolean {
		const chatId = msg.chat.id;
		const text = msg.text || '';
		const args = text.split(' ').slice(1);

		if (args.length !== 4) {
			return false;
		}

		const [proteins, fats, carbs, calories] = args.map(arg => parseFloat(arg));
		if (args.some(arg => isNaN(parseFloat(arg)))) {
			bot.sendMessage(chatId, "Please enter valid numbers.");

			return false;
		}

		bot.sendMessage(chatId, `Received macros: Proteins: ${proteins}, Fats: ${fats}, Carbs: ${carbs}, Calories: ${calories}`);

		return true
	}

	execute(msg: Message, bot: TelegramBot): void {
		const chatId = msg.chat.id;
		const userId = msg.from?.id;

		if (!userId) return

		UserStateManager.setUserState(userId, 'AWAITING_NUTRITION_DATA');

		bot.sendMessage(chatId, "Please provide 4 numbers: proteins, fats, carbs, calories.");
	}
}

