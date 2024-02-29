import { EnumRecaptchaError } from '@ddc/kit';
import { TranslateService } from '@ngx-translate/core';

export class GooglerecaptchaErrorConverter {
	toModel(error: string, translate: TranslateService): string {
		switch (error) {
			case EnumRecaptchaError.MISSING_INPUT_SECRET:
				return translate.instant('MESSAGE.GOOGLE_RECAPTCHA.MISSING_INPUT_SECRET');
			case EnumRecaptchaError.INVALID_INPUT_SECRET:
				return translate.instant('MESSAGE.GOOGLE_RECAPTCHA.INVALID_INPUT_SECRET');
			case EnumRecaptchaError.MISSING_INPUT_RESPONSE:
				return translate.instant('MESSAGE.GOOGLE_RECAPTCHA.MISSING_INPUT_RESPONSE');
			case EnumRecaptchaError.INVALID_INPUT_RESPONSE:
				return translate.instant('MESSAGE.GOOGLE_RECAPTCHA.INVALID_INPUT_RESPONSE');
			case EnumRecaptchaError.BAD_REQUEST:
				return translate.instant('MESSAGE.GOOGLE_RECAPTCHA.BAD_REQUEST');
			case EnumRecaptchaError.TIMEOUT_OR_DUPLICATE:
				return translate.instant('MESSAGE.GOOGLE_RECAPTCHA.TIMEOUT_OR_DUPLICATE');
			default:
				return '';
		}
	}

	toModelList(errors: string[], translate: TranslateService): string[] {
		const res: string[] = [];
		if (errors && errors.length) {
			errors.forEach((el) => {
				res.push(this.toModel(el, translate));
			});
		}
		return res;
	}
}
