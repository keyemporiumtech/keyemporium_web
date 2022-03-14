import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ProductattachmentModel } from '../models/productattachment.model';
import { ProductattachmentDTO } from '../dtos/productattachment.dto';
import { ProductConverter, ProductUtilConverter } from './product.converter';
import { ProductModel } from '../models/product.model';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class ProductattachmentConverter extends BaseApiConverter<
	ProductattachmentModel,
	ProductattachmentDTO
> {
	public convertToModel(dto?: ProductattachmentDTO): ProductattachmentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProductattachmentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('product', 'product_fk', new ProductConverter()),
			new ProductModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		return model;
	}
	public convertToDto(model?: ProductattachmentModel): ProductattachmentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProductattachmentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('product', 'product_fk', new ProductConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ProductattachmentModel {
		const model = new ProductattachmentModel();
		model.product = ProductUtilConverter.toModel();
		model.attachment = AttachmentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProductattachmentDTO {
		const dto = new ProductattachmentDTO();
		dto.product_fk = ProductUtilConverter.toDto();
		dto.attachment_fk = AttachmentUtilConverter.toDto();
		return dto;
	}
}

export class ProductattachmentUtilConverter {
	static toDto(model?: ProductattachmentModel) {
		const converter = new ProductattachmentConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ProductattachmentDTO) {
		const converter = new ProductattachmentConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ProductattachmentModel[]) {
		const converter = new ProductattachmentConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ProductattachmentDTO[]) {
		const converter = new ProductattachmentConverter();
		return converter.convertToModelList(dtos);
	}
}
