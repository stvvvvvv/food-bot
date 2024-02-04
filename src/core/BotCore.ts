import TelegramBot from 'node-telegram-bot-api';
import { MessageHandler } from './MessageHandler';
import { CommandsHandler } from '../commands/CommandsHandler';
import { SetNutritionCommand } from '../commands/SetNutritionCommand';
import { StartCommand } from '../commands/StartCommand';
import { UserStateManager, UserStateManagerClass } from './UserStateManager';

export class BotCore {
	private _bot: TelegramBot;
	private _messageHandler: MessageHandler;
	private _commandsHandler: CommandsHandler;
	private _userStateManager: UserStateManagerClass;

	constructor(token: string) {
		this._bot = new TelegramBot(token, { polling: true });

		this._userStateManager = UserStateManager;
		this._messageHandler = new MessageHandler(this._userStateManager);
		this._commandsHandler = new CommandsHandler();
		this.addCommands();
	}

	addCommands(): void {
		this._commandsHandler.addCommand(new StartCommand());
		this._commandsHandler.addCommand(new SetNutritionCommand());
	}

	start(): void {
		this._bot.on('message', (msg) => {
			const text = msg.text || '';
			const [command] = text.split(' ');

			if (command.startsWith('/')) {
				this._commandsHandler.executeCommand(msg, this._bot);
			}
			else {
				this._messageHandler.handle(msg, this._bot);
			}
		});
	}
}
