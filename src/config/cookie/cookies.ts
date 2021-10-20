import { EnumCookieType } from '../../app/shared/enums/cookie/cookie-type.enum';
import { CookieDTO } from '../../app/modules/api/cakeutils-be/dtos/cookie.dto';

export const cookies: CookieDTO[] = [
	{
		name: 'CAKEPHP',
		link: 'https://cakephp.org/privacy',
		description: 'APP.COOKIE.NECESSARY.CAKEPHP',
		durationDesc: '4h',
		protocol: 'HTTP',
		type: EnumCookieType.NECESSARY.toString(),
		created: undefined,
		modified: undefined,
		id: 1,
	},
	{
		name: 'ddc_profile',
		link: '',
		description: 'APP.COOKIE.PREFERENCE.PROFILE',
		durationDesc: '4h',
		protocol: 'HTTP',
		type: EnumCookieType.PREFERENCE.toString(),
		created: undefined,
		modified: undefined,
		id: 2,
	},
];
