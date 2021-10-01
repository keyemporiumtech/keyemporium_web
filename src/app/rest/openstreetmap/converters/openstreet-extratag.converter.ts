import { BaseConverter } from '@ddc/kit';
import { OpenstreetExtratagModel } from '../models/openstreet-extratag.model';
import { OpenstreetExtratagDTO } from '../dtos/openstreet-extratag.dto';
import { OpenstreetExtratagImageConverter } from './openstreet-extratag-image.converter';

export class OpenstreetExtratagConverter extends BaseConverter<
	OpenstreetExtratagModel,
	OpenstreetExtratagDTO
> {
	private imageConverter: OpenstreetExtratagImageConverter = new OpenstreetExtratagImageConverter();
	public convertToModel(dto?: OpenstreetExtratagDTO): OpenstreetExtratagModel {
		if (!dto) {
			return undefined;
		}
		const model = new OpenstreetExtratagModel();
		model.key = dto.key;
		model.value = dto.value;
		model.description = dto.description;
		model.image = this.imageConverter.convertToModel(dto.image);
		return model;
	}
	public convertToDto(model?: OpenstreetExtratagModel): OpenstreetExtratagDTO {
		if (!model) {
			return undefined;
		}
		const dto: OpenstreetExtratagDTO = { id: undefined };
		dto.key = model.key;
		dto.value = model.value;
		dto.description = model.description;
		dto.image = this.imageConverter.convertToDto(model.image);
		return dto;
	}
	public getEmptyModel(): OpenstreetExtratagModel {
		return new OpenstreetExtratagModel();
	}
	public getEmptyDto(): OpenstreetExtratagDTO {
		return { id: undefined };
	}
}
