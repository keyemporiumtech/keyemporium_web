import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ServiceModel } from '../models/service.model';
import { ServiceDTO } from '../dtos/service.dto';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { CategoryConverter, CategoryUtilConverter } from './category.converter';
import { CategoryModel } from '../models/category.model';
import { PriceConverter, PriceUtilConverter } from './price.converter';
import { PriceModel } from '../models/price.model';

export class ServiceConverter extends BaseApiConverter<ServiceModel, ServiceDTO> {
	public convertToModel(dto?: ServiceDTO): ServiceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ServiceModel();
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
			this.getPropertyForFk('category', 'category_fk', new CategoryConverter()),
			new CategoryModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('price', 'price_fk', new PriceConverter()),
			new PriceModel(),
		);
		model.note = dto.note;
		this.convertBooleanToModel(dto, model, 'flgdeleted');
		this.convertBooleanToModel(dto, model, 'flgreserve');
		return model;
	}
	public convertToDto(model?: ServiceModel): ServiceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ServiceDTO();
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
			this.getPropertyForFk('category', 'category_fk', new CategoryConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('price', 'price_fk', new PriceConverter()),
		);
		dto.note = model.note;
		this.convertBooleanToDto(dto, model, 'flgdeleted');
		this.convertBooleanToDto(dto, model, 'flgreserve');
		return dto;
	}
	public getEmptyModel(): ServiceModel {
		const model = new ServiceModel();
		model.image = AttachmentUtilConverter.toModel();
		model.category = CategoryUtilConverter.toModel();
		model.price = PriceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ServiceDTO {
		const dto = new ServiceDTO();
		dto.image_fk = AttachmentUtilConverter.toDto();
		dto.category_fk = CategoryUtilConverter.toDto();
		dto.price_fk = PriceUtilConverter.toDto();
		return dto;
	}
}

export class ServiceUtilConverter {
	static toDto(model?: ServiceModel) {
		const converter = new ServiceConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ServiceDTO) {
		const converter = new ServiceConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ServiceModel[]) {
		const converter = new ServiceConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ServiceDTO[]) {
		const converter = new ServiceConverter();
		return converter.convertToModelList(dtos);
	}
}
