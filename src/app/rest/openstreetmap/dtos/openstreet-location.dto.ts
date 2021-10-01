import { OpenstreetAddressDTO } from './openstreet-address.dto';
import { OpenstreetExtratagDTO } from './openstreet-extratag.dto';
import { BaseDTO } from '@ddc/kit';

export interface OpenstreetLocationDTO extends BaseDTO {
	place_id?: number;
	osm_type?: string;
	osm_id?: number;
	boundingbox?: number[];
	lat?: number;
	lon?: number;
	display_name?: string;
	class?: string;
	type?: string;
	importance?: number;
	icon?: string;
	licence?: string;
	address?: OpenstreetAddressDTO;
	extratags?: any;
	namedetails?: any;
	// added
	tags?: OpenstreetExtratagDTO[];
}
