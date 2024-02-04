import TelegramBot, { Message } from 'node-telegram-bot-api';

export abstract class Command {
	public name: string;
	public description: string;

	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
	}

	abstract handle(msg: Message, bot: TelegramBot): boolean;
	abstract execute(msg: Message, bot: TelegramBot): void;
}
