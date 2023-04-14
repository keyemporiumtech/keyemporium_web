import { HttpParams } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, distinctUntilChanged, first, switchMap } from 'rxjs/operators';
import { EnumParamType } from '../enums/param-type.enum';

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

	static getObjQueryParametersByArray(params: string[], qp?: any): any {
		const ret: any = qp ? qp : {};
		let arrRet: string[] = [];
		for (const q of params) {
			arrRet = q.split('=');
			if (arrRet && arrRet.length === 2) {
				ret[arrRet[0]] = arrRet[1];
			}
		}
		return ret;
	}

	static getObjQueryParametersByMap(params: Map<string, string | string[]>, qp?: any): any {
		const paramsArr: string[] = [];
		for (const [key, value] of params.entries()) {
			paramsArr.push(key + '=' + this.getStringByIn(value));
		}
		return this.getObjQueryParametersByArray(paramsArr, qp);
	}

	static getQueryParametersByArray(params: string[]): string {
		return params && params.length ? '?' + params.join('&') : undefined;
	}

	static getQueryParametersByMap(params: Map<string, string | string[]>): string {
		const paramsArr: string[] = [];
		for (const [key, value] of params.entries()) {
			paramsArr.push(key + '=' + this.getStringByIn(value));
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

	static getStringByIn(inStr: any): string {
		if (Array.isArray(inStr)) {
			return inStr.join(';');
		}
		return inStr;
	}
}
