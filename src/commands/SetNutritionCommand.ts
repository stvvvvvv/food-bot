import TelegramBot, { Message } from 'node-telegram-bot-api';
import { Command } from './Command';

class SetMacrosCommand extends Command {
	constructor() {
		super('/setmacros', 'Set your macros (Proteins, Fats, Carbs, Calories)');
	}

	execute(msg: Message, bot: TelegramBot): void {
		const chatId = msg.chat.id;
		const text = msg.text || '';
		const args = text.split(' ').slice(1);

		if (args.length !== 4) {
			bot.sendMessage(chatId, "Please provide 4 numbers: proteins, fats, carbs, calories.");

			return;
		}

		const [proteins, fats, carbs, calories] = args.map(arg => parseFloat(arg));
		if (args.some(arg => isNaN(parseFloat(arg)))) {
			bot.sendMessage(chatId, "Please enter valid numbers.");

			return;
		}

		bot.sendMessage(chatId, `Received macros: Proteins: ${proteins}, Fats: ${fats}, Carbs: ${carbs}, Calories: ${calories}`);
	}
}

export { SetMacrosCommand };
