import { HttpParams } from '@angular/common/http';
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
}
