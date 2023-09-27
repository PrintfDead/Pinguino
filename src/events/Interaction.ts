import { Event, BaseEvent } from 'ioc:factory/Core/Event'
import { Interaction, MessageEmbed } from 'discord.js'
import { Client } from '@printfdead/open.db'

@Event('interactionCreate')
export default class FooEvent implements BaseEvent {
	public async run(int: Interaction): Promise<void> {
		
	}
}