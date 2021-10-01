import { TranslateService } from '@ngx-translate/core';
import { StringTranslate } from '../models/string-translate.model';

export class TranslateUtility {
	static get(value: string | StringTranslate, translateService: TranslateService): string {
		if (typeof value === 'string') {
			return translateService.instant(value);
		} else if (value instanceof StringTranslate) {
			return translateService.instant(value.key, value.params) as string;
		}
		return undefined;
	}
}
