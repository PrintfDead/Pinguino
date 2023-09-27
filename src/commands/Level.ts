import { BaseCommand, Command } from 'ioc:factory/Core/Command'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import { Client } from '@printfdead/open.db';

@Command({
	scope: 'GLOBAL', 
	options: {
		name: 'level',
		description: 'Your Level',
		options: [],
	},
})
export default class LevelCommand implements BaseCommand {
	public async run(int: CommandInteraction): Promise<void> {
        const db = new Client({ Path: "src/", Buffer: 1024 });
        db.SetDatabase("Example");

		let user = db.Find("User", (container) => container?.ID === int.user.id);

		if (!user) {
        	await db.Add({ name: int.user.username, level: 0, exp: 0 }, "User", int.user.id);
			user = db.Find("User", (container) => container?.ID === int.user.id);
		}

		const embed = new MessageEmbed()
			.setTitle("Your Level")
			.setDescription(`https://github.com/PrintfDead/OpenDB\nLevel: ${user?.Content["level"]}\nExp: ${user?.Content["exp"]}`)
			.setTimestamp();

		await int.reply({ embeds: [embed] });
	}
}