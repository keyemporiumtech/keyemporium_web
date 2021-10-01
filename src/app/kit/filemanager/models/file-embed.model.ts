import { EnumTypeMime } from '../enums/type-mine.enum';
import { StringTranslate } from '../../translation/models/string-translate.model';
import { SizeFormat } from './size-format.model';

export class FileEmbedModel {
	public name: string;
	private _title: string | StringTranslate;
	public description: string;
	public back: any; // router link to back
	public mime: string;
	public type: EnumTypeMime;
	public ext: string;
	public size: number;
	public sizeFormat: SizeFormat;
	public sizeString: string;
	public content: any;
	public resource: string;
	public blob: any;

	get title(): string | StringTranslate {
		return this._title ? this._title : this.name;
	}
	set title(title: string | StringTranslate) {
		this._title = title;
	}
}
