import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageValidatorUtil } from '@ddc/kit';
import { QueryUtility } from '@ddc/rest';
import { CreditcardService } from '../services/creditcard.service';

export class CreditcardValidator {
	static validate(
		mm: AbstractControl,
		yy: AbstractControl,
		cvc: AbstractControl,
		service: CreditcardService,
	): AsyncValidatorFn {
		return (control: AbstractControl): Observable<{ [key: string]: any } | undefined> => {
			if (!mm || !mm.value || !yy || !yy.value || !cvc || !cvc.value) {
				return of({ creditcard: true });
			}
			if (!control || !control.value) {
				return of(null);
			}
			return service
				.validate(
					control.value,
					mm.value,
					yy.value,
					cvc.value,
					undefined,
					undefined,
					QueryUtility.SKIP_ERROR_RES,
				)
				.pipe(
					map((res) => {
						return res.valid ? null : { creditcard: res.message };
					}),
				);
		};
	}

	public static CREDITCARD = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'creditcard',
			message ? message : 'VALIDATION.CREDITCARD',
			params,
		);
	};
}
