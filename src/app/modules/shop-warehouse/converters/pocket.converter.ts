import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PocketModel } from '../models/pocket.model';
import { PocketDTO } from '../dtos/pocket.dto';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { PriceConverter, PriceUtilConverter } from './price.converter';
import { PriceModel } from '../models/price.model';

export class PocketConverter extends BaseApiConverter<PocketModel, PocketDTO> {
	public convertToModel(dto?: PocketDTO): PocketModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PocketModel();
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
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('price', 'price_fk', new PriceConverter()),
			new PriceModel(),
		);
		model.note = dto.note;
		this.convertBooleanToModel(dto, model, 'flgreleted');
		this.convertBooleanToModel(dto, model, 'flgdeleted');
		return model;
	}
	public convertToDto(model?: PocketModel): PocketDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PocketDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.description = model.description;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('image', 'image_fk', new AttachmentConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('price', 'price_fk', new PriceConverter()),
		);
		dto.note = model.note;
		this.convertBooleanToDto(dto, model, 'flgreleted');
		this.convertBooleanToDto(dto, model, 'flgdeleted');
		return dto;
	}
	public getEmptyModel(): PocketModel {
		const model = new PocketModel();
		model.image = AttachmentUtilConverter.toModel();
		model.price = PriceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): PocketDTO {
		const dto = new PocketDTO();
		dto.image_fk = AttachmentUtilConverter.toDto();
		dto.price_fk = PriceUtilConverter.toDto();
		return dto;
	}
}

export class PocketUtilConverter {
	static toDto(model?: PocketModel) {
		const converter = new PocketConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: PocketDTO) {
		const converter = new PocketConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: PocketModel[]) {
		const converter = new PocketConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: PocketDTO[]) {
		const converter = new PocketConverter();
		return converter.convertToModelList(dtos);
	}
}
