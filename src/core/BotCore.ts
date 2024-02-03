import TelegramBot from 'node-telegram-bot-api';
import { MessageHandler } from './MessageHandler';
import { CommandsHandler } from '../commands/CommandsHandler';
import { SetMacrosCommand } from '../commands/SetNutritionCommand';

export class BotCore {
	private _bot: TelegramBot;
	private _messageHandler: MessageHandler;
	private _commandsHandler: CommandsHandler;

	constructor(token: string) {
		this._bot = new TelegramBot(token, { polling: true });
		this._messageHandler = new MessageHandler();
		this._commandsHandler = new CommandsHandler();
		this.addCommands();
	}

	addCommands(): void {
		this._commandsHandler.addCommand(new SetMacrosCommand());
	}

	start(): void {
		this._bot.on('message', (msg) => {
			const text = msg.text || '';
			const [command] = text.split(' ');

			if (command.startsWith('/')) {
				this._commandsHandler.handleCommand(msg, this._bot);
			}
			else {
				this._messageHandler.handle(msg, this._bot);
			}
		});
	}
}
