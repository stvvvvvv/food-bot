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

	handleCommand(msg: Message, bot: TelegramBot): void {
		const commandText = msg.text?.trim().split(' ')[0];

		if (commandText) {
			const command = this.commands.get(commandText);

			if (command) {
				command.execute(msg, bot);
			} else {
				bot.sendMessage(msg.chat.id, "Command not recognized.");
			}
		}
	}
}
