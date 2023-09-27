import { Event, BaseEvent } from 'ioc:factory/Core/Event'
import { GuildMember } from 'discord.js'
import { Client } from '@printfdead/open.db'

@Event('guildMemberAdd')
export default class FooEvent implements BaseEvent {
    public async run(member: GuildMember): Promise<void> {
        const db = new Client({ Path: "src/", Buffer: 1024 });
        db.SetDatabase("Example");

        db.Add({ name: member.user.username, level: 0, exp: 0 }, "User", member.id);
    }
}