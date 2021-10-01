import { EnumSizeFormat } from '../enums/size-format.enum';

export class SizeFormat {
	public constructor(public size: number, public unit: EnumSizeFormat) {}

	get sizeString(): string {
		return this.size + ' ' + this.unit;
	}
}
