import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { CategoryattachmentModel } from '../models/categoryattachment.model';
import { CategoryattachmentDTO } from '../dtos/categoryattachment.dto';
import { CategoryConverter, CategoryUtilConverter } from './category.converter';
import { CategoryModel } from '../models/category.model';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class CategoryattachmentConverter extends BaseApiConverter<
	CategoryattachmentModel,
	CategoryattachmentDTO
> {
	public convertToModel(dto?: CategoryattachmentDTO): CategoryattachmentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new CategoryattachmentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('category', 'category_fk', new CategoryConverter()),
			new CategoryModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		return model;
	}
	public convertToDto(model?: CategoryattachmentModel): CategoryattachmentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new CategoryattachmentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('category', 'category_fk', new CategoryConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
		);
		return dto;
	}
	public getEmptyModel(): CategoryattachmentModel {
		const model = new CategoryattachmentModel();
		model.category = CategoryUtilConverter.toModel();
		model.attachment = AttachmentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): CategoryattachmentDTO {
		const dto = new CategoryattachmentDTO();
		dto.category_fk = CategoryUtilConverter.toDto();
		dto.attachment_fk = AttachmentUtilConverter.toDto();
		return dto;
	}
}

export class CategoryattachmentUtilConverter {
	static toDto(model?: CategoryattachmentModel) {
		const converter = new CategoryattachmentConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: CategoryattachmentDTO) {
		const converter = new CategoryattachmentConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: CategoryattachmentModel[]) {
		const converter = new CategoryattachmentConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: CategoryattachmentDTO[]) {
		const converter = new CategoryattachmentConverter();
		return converter.convertToModelList(dtos);
	}
}
