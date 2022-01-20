import { PasswordService } from '../services/password.service';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageValidatorUtil } from '@ddc/kit';
import { QueryUtility, RequestUtility } from '@ddc/rest';

export class PasswordValidator {
	static validate(
		service: PasswordService,
		min?: number,
		max?: number,
		level?: number,
		separator?: string,
	): AsyncValidatorFn {
		return (control: AbstractControl): Observable<{ [key: string]: any } | undefined> => {
			if (!control || !control.value) {
				return of(null);
			}
			return service
				.validate(control.value, level, min, max, separator, undefined, QueryUtility.SKIP_ERROR_RES)
				.pipe(
					map((res) => {
						return res.valid ? null : { password: res.message };
					}),
				);
		};
	}

	public static PASSWORD = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'password',
			message ? message : 'VALIDATION.PASSWORD',
			params,
		);
	};
}
