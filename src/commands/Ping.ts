import { BaseCommand, Command } from 'ioc:factory/Core/Command'
import { CommandInteraction } from 'discord.js'

@Command({
	scope: 'GLOBAL', 
	options: {
		name: 'ping',
		description: 'Pong!',
		options: [],
	},
})
export default class PingCommand implements BaseCommand {
	public async run(interaction: CommandInteraction): Promise<void> {
		await interaction.reply("Pong!");
	}
}