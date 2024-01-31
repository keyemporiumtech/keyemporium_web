export abstract class BaseIdModel {
	idClass: string;

	constructor() {
		this.idClass = Math.random().toString(36).replace('0.', '');
	}

	getId(): string {
		return this.idClass;
	}
}
