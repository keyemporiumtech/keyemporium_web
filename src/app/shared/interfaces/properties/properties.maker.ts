export class PropertiesMaker {
	static setValue(instance: any, key: string, value: any): void {
		instance[key] = value;
	}
}
