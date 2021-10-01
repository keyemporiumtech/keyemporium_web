import { IbanService } from '../services/iban.service';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageValidatorUtil } from '@ddc/kit';
import { QueryUtility } from '@ddc/rest';

export class IbanValidator {
	static validate(nation: AbstractControl, service: IbanService): AsyncValidatorFn {
		return (control: AbstractControl): Observable<{ [key: string]: any } | undefined> => {
			if (!nation || !nation.value) {
				return of({ iban: true });
			}
			if (!control || !control.value) {
				return of(null);
			}
			return service
				.validate(control.value, nation.value, undefined, QueryUtility.SKIP_ERROR_RES)
				.pipe(
					map((res) => {
						return res.valid ? null : { iban: res.message };
					}),
				);
		};
	}

	public static IBAN = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'iban',
			message ? message : 'VALIDATION.IBAN',
			params,
		);
	};
}
