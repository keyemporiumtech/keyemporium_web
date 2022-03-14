import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ProductdiscountModel } from '../models/productdiscount.model';
import { ProductdiscountDTO } from '../dtos/productdiscount.dto';
import { ProductConverter, ProductUtilConverter } from './product.converter';
import { ProductModel } from '../models/product.model';
import { DiscountConverter, DiscountUtilConverter } from './discount.converter';
import { DiscountModel } from '../models/discount.model';

export class ProductdiscountConverter extends BaseApiConverter<
	ProductdiscountModel,
	ProductdiscountDTO
> {
	public convertToModel(dto?: ProductdiscountDTO): ProductdiscountModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProductdiscountModel();
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
			this.getPropertyForFk('discount', 'discount_fk', new DiscountConverter()),
			new DiscountModel(),
		);
		return model;
	}
	public convertToDto(model?: ProductdiscountModel): ProductdiscountDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProductdiscountDTO();
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
			this.getPropertyForFk('discount', 'discount_fk', new DiscountConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ProductdiscountModel {
		const model = new ProductdiscountModel();
		model.product = ProductUtilConverter.toModel();
		model.discount = DiscountUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProductdiscountDTO {
		const dto = new ProductdiscountDTO();
		dto.product_fk = ProductUtilConverter.toDto();
		dto.discount_fk = DiscountUtilConverter.toDto();
		return dto;
	}
}

export class ProductdiscountUtilConverter {
	static toDto(model?: ProductdiscountModel) {
		const converter = new ProductdiscountConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ProductdiscountDTO) {
		const converter = new ProductdiscountConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ProductdiscountModel[]) {
		const converter = new ProductdiscountConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ProductdiscountDTO[]) {
		const converter = new ProductdiscountConverter();
		return converter.convertToModelList(dtos);
	}
}
