import { Application } from 'ioc:factory/Core'
import { BaseProvider, EntityResolvable } from 'ioc:factory/Core/Provider'
import { Client } from 'discord.js'
import Logger from '@leadcodedev/logger'
import { Client as OpenDB } from '@printfdead/open.db'

export default class AppProvider implements BaseProvider {
	public async boot (): Promise<void> {
		const db = new OpenDB({ Path: "src/", Buffer: 1024 });
		await db.Start();
		await db.CreateDatabase("Example");
		db.SetDatabase("Example");
		await db.CreatePointer("User");

		Logger.send('info', 'Application start');
		// Your code here
	}

	public async load (Class: EntityResolvable): Promise<void> {
		Logger.send('info', `Load file ${Class.file?.relativePath}`);
		// Your code here
	}

	public async ok (): Promise<void> {
		const client: Client = Application.getClient();
		
		// Set presence
		await client.user?.setPresence({
			status: 'online',
				afk: false,
				activities: [
					{ name: 'Siendo un pinguino feliz ;)', type: 'PLAYING' }
				]
		});
		
		Logger.send('info', `Application is ready and the presence of ${client.user?.username} is define to ${client.user?.presence.activities[0].name}`)
	}
}