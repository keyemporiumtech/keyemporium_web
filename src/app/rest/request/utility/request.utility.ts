import { HttpParams } from '@angular/common/http';
import { EnumParamType } from '../enums/param-type.enum';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { switchMap, delay, distinctUntilChanged, first } from 'rxjs/operators';

export class RequestUtility {
	static addParam(
		httpParam: HttpParams,
		type: EnumParamType,
		key: string,
		value?: any,
	): HttpParams {
		switch (type) {
			case EnumParamType.NUMBER:
				return httpParam.append(key, value ? value.toString() : null);
			case EnumParamType.STRING:
				return httpParam.append(key, value ? value : null);
			case EnumParamType.BOOLEAN:
				return httpParam.append(
					key,
					value !== null && value !== undefined ? JSON.stringify(value) : null,
				);
			case EnumParamType.ARRAY:
				return httpParam.append(key, value ? JSON.stringify(value) : null);
			case EnumParamType.OBJECT:
				return httpParam.append(key, value ? JSON.stringify(value) : null);
			default:
				return httpParam.append(key, null);
		}
	}

	static getQueryParametersByArray(params: string[]): string {
		return params && params.length ? '?' + params.join('&') : undefined;
	}

	static getQueryParametersByMap(params: Map<string, string>): string {
		const paramsArr: string[] = [];
		for (const [key, value] of params.entries()) {
			paramsArr.push(key + '=' + value);
		}
		return this.getQueryParametersByArray(paramsArr);
	}

	static debounceAsyncValidator(inputValidator: AsyncValidatorFn, time: number): AsyncValidatorFn {
		return (control: AbstractControl): Observable<{ [key: string]: any } | undefined> => {
			return of(control.value).pipe(
				delay(time),
				distinctUntilChanged(),
				switchMap(() => inputValidator(control)),
				first(),
			);
		};
	}

	static debounceAsyncByValue<T>(value: any, time: number, async: Observable<T>): Observable<T> {
		return of(value).pipe(
			delay(time),
			distinctUntilChanged(),
			switchMap(() => async),
			first(),
		);
	}
}
