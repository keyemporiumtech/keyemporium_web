import { BaseDTO } from '@ddc/kit';

export interface OpenstreetExtratagImageDTO extends BaseDTO {
	name?: string;
	width?: number;
	height?: number;
	mime?: string;
	url?: string;
	url_prefix?: string;
	url_suffix?: string;
}
