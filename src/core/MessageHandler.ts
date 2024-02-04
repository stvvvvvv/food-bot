import TelegramBot, { Message } from 'node-telegram-bot-api';
import { UserStateManagerClass } from './UserStateManager';
import { SetNutritionCommand } from '../commands/SetNutritionCommand';

export class MessageHandler {
	private _userStateManager: UserStateManagerClass;
	private _isCommandProcessed: boolean;

	constructor(userStateManager: UserStateManagerClass) {
		this._userStateManager = userStateManager;
		this._isCommandProcessed = false;
	}

	handle(msg: Message, bot: TelegramBot): void {
		const chatId = msg.chat.id;
		const userId = msg.from?.id;

		if (!userId) return;

		const userState = this._userStateManager.getUserState(userId);

		switch (userState) {
			case 'AWAITING_NUTRITION_DATA':
				const setNutritionCommand = new SetNutritionCommand();
				this._isCommandProcessed = setNutritionCommand.handle(msg, bot);

				break;
			case 'NONE':
			default:

				bot.sendMessage(chatId, "Hey!");
				break;
		}

		if (this._isCommandProcessed) {
			this._userStateManager.setUserState(userId, 'NONE');
		}
	}
}