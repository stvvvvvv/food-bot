import TelegramBot, { Message } from 'node-telegram-bot-api';

export abstract class Command {
	public name: string;
	public description: string;

	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
	}

	abstract execute(msg: Message, bot: TelegramBot): void;
}
