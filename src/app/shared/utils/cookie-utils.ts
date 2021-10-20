import { EnumCookieType } from '../enums/cookie/cookie-type.enum';

export class CookieUtils {
	static set(type: EnumCookieType, val: boolean) {
		localStorage.setItem(type, this.toStringVal(val));
	}

	static check(type: EnumCookieType) {
		return this.toBooleanVal(localStorage.getItem(type));
	}

	static toBooleanVal(val: string): boolean {
		return val === '1' ? true : false;
	}

	static toStringVal(val: boolean): string {
		return val ? '1' : '0';
	}
}
