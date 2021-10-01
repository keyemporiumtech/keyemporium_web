import { OptionListModel } from '@ddc/kit';

export class FormUtils {
	static getOptionByKey(options: OptionListModel[], keys: any[], multiple?: boolean) {
		if (multiple) {
			return options.find((el) => keys.includes(el.key));
		} else {
			return options.find((el) => el.key === keys[0]);
		}
	}

	static getOptionPayloadByKey(options: OptionListModel[], keys: any[], multiple?: boolean) {
		const option = this.getOptionByKey(options, keys, multiple);
		return option ? option.payload : undefined;
	}
}
