import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { BrandModel } from '../models/brand.model';
import { BrandDTO } from '../dtos/brand.dto';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class BrandConverter extends BaseApiConverter<BrandModel, BrandDTO> {
	public convertToModel(dto?: BrandDTO): BrandModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BrandModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.description = dto.description;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('image', 'image_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		return model;
	}
	public convertToDto(model?: BrandModel): BrandDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BrandDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.description = model.description;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('image', 'image_fk', new AttachmentConverter()),
		);
		return dto;
	}
	public getEmptyModel(): BrandModel {
		const model = new BrandModel();
		model.image = AttachmentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BrandDTO {
		const dto = new BrandDTO();
		dto.image_fk = AttachmentUtilConverter.toDto();
		return dto;
	}
}

export class BrandUtilConverter {
	static toDto(model?: BrandModel) {
		const converter = new BrandConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BrandDTO) {
		const converter = new BrandConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BrandModel[]) {
		const converter = new BrandConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BrandDTO[]) {
		const converter = new BrandConverter();
		return converter.convertToModelList(dtos);
	}
}
