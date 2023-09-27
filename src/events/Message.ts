import { Event, BaseEvent } from 'ioc:factory/Core/Event'
import { Message, MessageEmbed } from 'discord.js'
import { Client } from '@printfdead/open.db'

@Event('messageCreate')
export default class FooEvent implements BaseEvent {
	public async run(message: Message): Promise<void> {
		const db = new Client({ Path: "src/", Buffer: 1024 });
        db.SetDatabase("Example");

        let user: any = db.Find("User", (container) => container?.ID === message.member?.id);

        if (!user) {
        	await db.Add({ name: message.member?.user.username, level: 0, exp: 0 }, "User", message.member?.id);
			user = db.Find("User", (container) => container?.ID === message.member?.id);
		}

        if (user.Content.exp < 100) {
            user.Content["exp"] += 10;
            await user.save();

            db.Update();
        } else {
            user.Content["exp"] = 0;
            user.Content["level"] += 1;
            await user.save();

            message.reply("Yeah! Level Up to " + user.Content["level"] + "!");

            db.Update();
        }
	}
}