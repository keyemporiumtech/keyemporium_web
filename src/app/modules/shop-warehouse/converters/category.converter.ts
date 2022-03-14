import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { CategoryModel } from '../models/category.model';
import { CategoryDTO } from '../dtos/category.dto';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class CategoryConverter extends BaseApiConverter<CategoryModel, CategoryDTO> {
	public convertToModel(dto?: CategoryDTO): CategoryModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new CategoryModel();
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
			this.getPropertyForFk('parent', 'parent_fk', new CategoryConverter(), 'parent_id'),
			new CategoryModel(),
		);
		model.lft = dto.lft;
		model.rght = dto.rght;
		model.reftable = dto.reftable;
		return model;
	}
	public convertToDto(model?: CategoryModel): CategoryDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new CategoryDTO();
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
			this.getPropertyForFk('parent', 'parent_fk', new CategoryConverter(), 'parent_id'),
		);
		dto.lft = model.lft;
		dto.rght = model.rght;
		dto.reftable = model.reftable;
		return dto;
	}
	public getEmptyModel(): CategoryModel {
		const model = new CategoryModel();
		model.image = AttachmentUtilConverter.toModel();
		model.parent = CategoryUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): CategoryDTO {
		const dto = new CategoryDTO();
		dto.image_fk = AttachmentUtilConverter.toDto();
		dto.parent_fk = CategoryUtilConverter.toDto();
		return dto;
	}
}

export class CategoryUtilConverter {
	static toDto(model?: CategoryModel) {
		const converter = new CategoryConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: CategoryDTO) {
		const converter = new CategoryConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: CategoryModel[]) {
		const converter = new CategoryConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: CategoryDTO[]) {
		const converter = new CategoryConverter();
		return converter.convertToModelList(dtos);
	}
}
