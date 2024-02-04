import TelegramBot, { Message } from 'node-telegram-bot-api';
import { Command } from './Command';

export class CommandsHandler {
	private commands: Map<string, Command>;

	constructor() {
		this.commands = new Map();
	}

	addCommand(command: Command): void {
		this.commands.set(command.name, command);
	}

	executeCommand(msg: Message, bot: TelegramBot): void {
		const commandName = msg.text?.trim().split(' ')[0];

		if (commandName) {
			const command = this.commands.get(commandName);

			if (command) {
				command.execute(msg, bot);
			} else {
				bot.sendMessage(msg.chat.id, "Command not recognized.");
			}
		}
	}

	handleCommand(msg: Message, bot: TelegramBot): boolean {
		const commandName = msg.text?.trim().split(' ')[0];
		if (!commandName) return false

		const command = this.commands.get(commandName);
		if (!command) return false;

		const isProcessed = command.handle(msg, bot);

		return isProcessed
	}
}
