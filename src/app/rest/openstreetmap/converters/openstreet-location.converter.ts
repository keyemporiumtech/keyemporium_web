import { BaseConverter } from '@ddc/kit';
import { OpenstreetLocationModel } from '../models/openstreet-location.model';
import { OpenstreetLocationDTO } from '../dtos/openstreet-location.dto';
import { OpenstreetAddressConverter } from './openstreet-address.converter';
import { OpenstreetExtratagConverter } from './openstreet-extratag.converter';

export class OpenstreetLocationConverter extends BaseConverter<
	OpenstreetLocationModel,
	OpenstreetLocationDTO
> {
	private addressConverter: OpenstreetAddressConverter = new OpenstreetAddressConverter();
	private extratagConverter: OpenstreetExtratagConverter = new OpenstreetExtratagConverter();
	public convertToModel(dto?: OpenstreetLocationDTO): OpenstreetLocationModel {
		if (!dto) {
			return undefined;
		}
		const model = new OpenstreetLocationModel();
		model.place_id = dto.place_id;
		model.osm_type = dto.osm_type;
		model.osm_id = dto.osm_id;
		model.boundingbox = dto.boundingbox;
		model.lat = dto.lat;
		model.lon = dto.lon;
		model.display_name = dto.display_name;
		model.class = dto.class;
		model.type = dto.type;
		model.importance = dto.importance;
		model.icon = dto.icon;
		model.licence = dto.licence;
		model.address = this.addressConverter.convertToModel(dto.address);
		model.extratags = dto.extratags;
		model.namedetails = dto.namedetails;
		model.tags = this.extratagConverter.convertToModelList(dto.tags);
		return model;
	}
	public convertToDto(model?: OpenstreetLocationModel): OpenstreetLocationDTO {
		if (!model) {
			return undefined;
		}
		const dto: OpenstreetLocationDTO = { id: model.place_id };
		dto.place_id = model.place_id;
		dto.osm_type = model.osm_type;
		dto.osm_id = model.osm_id;
		dto.boundingbox = model.boundingbox;
		dto.lat = model.lat;
		dto.lon = model.lon;
		dto.display_name = model.display_name;
		dto.class = model.class;
		dto.type = model.type;
		dto.importance = model.importance;
		dto.icon = model.icon;
		dto.licence = model.licence;
		dto.address = this.addressConverter.convertToDto(model.address);
		dto.extratags = model.extratags;
		dto.namedetails = model.namedetails;
		dto.tags = this.extratagConverter.convertToDtoList(model.tags);
		return dto;
	}
	public getEmptyModel(): OpenstreetLocationModel {
		return new OpenstreetLocationModel();
	}
	public getEmptyDto(): OpenstreetLocationDTO {
		return { id: undefined };
	}
}
