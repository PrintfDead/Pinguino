import CoreCommands from '@discord-factory/core-commands';
import { driverType } from '@discord-factory/storage-next/build/types';

export default class Kernel {
	public DRIVER: driverType = "sqlite3";
	public PATH: string = "../src/storage"
	
	public registerAddons () {
		return [CoreCommands]
	}
}