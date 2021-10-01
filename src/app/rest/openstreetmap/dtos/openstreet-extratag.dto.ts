import { OpenstreetExtratagImageDTO } from './openstreet-extratag-image.dto';
import { BaseDTO } from '@ddc/kit';

export interface OpenstreetExtratagDTO extends BaseDTO {
	key?: string;
	value?: string;
	description?: string;
	image?: OpenstreetExtratagImageDTO;
}
