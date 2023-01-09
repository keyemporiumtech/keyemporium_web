import { StringTranslate } from '../../translation/models/string-translate.model';

export class OptionListModel {
	constructor(
		public key: any,
		public text: string | StringTranslate,
		public payload?: any,
		public cssClass?: any,
		public cssStyle?: any,
	) {}

	public textClear?: string;
}
