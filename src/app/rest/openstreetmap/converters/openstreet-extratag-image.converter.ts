import { BaseConverter } from '@ddc/kit';
import { OpenstreetExtratagImageModel } from '../models/openstreet-extratag-image.model';
import { OpenstreetExtratagImageDTO } from '../dtos/openstreet-extratag-image.dto';

export class OpenstreetExtratagImageConverter extends BaseConverter<
	OpenstreetExtratagImageModel,
	OpenstreetExtratagImageDTO
> {
	public convertToModel(dto?: OpenstreetExtratagImageDTO): OpenstreetExtratagImageModel {
		if (!dto) {
			return undefined;
		}
		const model = new OpenstreetExtratagImageModel();
		model.name = dto.name;
		model.width = dto.width;
		model.height = dto.height;
		model.mime = dto.mime;
		model.url = dto.url;
		model.url_prefix = dto.url_prefix;
		model.url_suffix = dto.url_suffix;
		return model;
	}
	public convertToDto(model?: OpenstreetExtratagImageModel): OpenstreetExtratagImageDTO {
		if (!model) {
			return undefined;
		}
		const dto: OpenstreetExtratagImageDTO = { id: undefined };
		dto.name = model.name;
		dto.width = model.width;
		dto.height = model.height;
		dto.mime = model.mime;
		dto.url = model.url;
		dto.url_prefix = model.url_prefix;
		dto.url_suffix = model.url_suffix;
		return dto;
	}
	public getEmptyModel(): OpenstreetExtratagImageModel {
		return new OpenstreetExtratagImageModel();
	}
	public getEmptyDto(): OpenstreetExtratagImageDTO {
		return { id: undefined };
	}
}
