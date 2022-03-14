import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ProductModel } from '../models/product.model';
import { ProductDTO } from '../dtos/product.dto';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { BrandConverter, BrandUtilConverter } from './brand.converter';
import { BrandModel } from '../models/brand.model';
import { CategoryConverter, CategoryUtilConverter } from './category.converter';
import { CategoryModel } from '../models/category.model';
import { PriceConverter, PriceUtilConverter } from './price.converter';
import { PriceModel } from '../models/price.model';

export class ProductConverter extends BaseApiConverter<ProductModel, ProductDTO> {
	public convertToModel(dto?: ProductDTO): ProductModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProductModel();
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
		model.quantity = dto.quantity;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('brand', 'brand_fk', new BrandConverter()),
			new BrandModel(),
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
		model.weight = dto.weight;
		model.width = dto.width;
		model.height = dto.height;
		this.convertBooleanToModel(dto, model, 'flgdeleted');
		this.convertBooleanToModel(dto, model, 'flgwarehouse');
		this.convertBooleanToModel(dto, model, 'flgreserve');
		return model;
	}
	public convertToDto(model?: ProductModel): ProductDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProductDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.description = model.description;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('image', 'image_fk', new AttachmentConverter()),
		);
		dto.quantity = model.quantity;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('brand', 'brand_fk', new BrandConverter()),
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
		dto.weight = model.weight;
		dto.width = model.width;
		dto.height = model.height;
		this.convertBooleanToDto(dto, model, 'flgdeleted');
		this.convertBooleanToDto(dto, model, 'flgwarehouse');
		this.convertBooleanToDto(dto, model, 'flgreserve');
		return dto;
	}
	public getEmptyModel(): ProductModel {
		const model = new ProductModel();
		model.image = AttachmentUtilConverter.toModel();
		model.brand = BrandUtilConverter.toModel();
		model.category = CategoryUtilConverter.toModel();
		model.price = PriceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProductDTO {
		const dto = new ProductDTO();
		dto.image_fk = AttachmentUtilConverter.toDto();
		dto.brand_fk = BrandUtilConverter.toDto();
		dto.category_fk = CategoryUtilConverter.toDto();
		dto.price_fk = PriceUtilConverter.toDto();
		return dto;
	}
}

export class ProductUtilConverter {
	static toDto(model?: ProductModel) {
		const converter = new ProductConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ProductDTO) {
		const converter = new ProductConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ProductModel[]) {
		const converter = new ProductConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ProductDTO[]) {
		const converter = new ProductConverter();
		return converter.convertToModelList(dtos);
	}
}
