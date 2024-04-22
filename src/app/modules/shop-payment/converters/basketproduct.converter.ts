import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { BasketproductModel } from '../models/basketproduct.model';
import { BasketproductDTO } from '../dtos/basketproduct.dto';
import {
	ProductConverter,
	ProductUtilConverter,
} from '../../shop-warehouse/converters/product.converter';
import { ProductModel } from '../../shop-warehouse/models/product.model';
import { BasketConverter, BasketUtilConverter } from './basket.converter';
import { BasketModel } from '../models/basket.model';

export class BasketproductConverter extends BaseApiConverter<BasketproductModel, BasketproductDTO> {
	public convertToModel(dto?: BasketproductDTO): BasketproductModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BasketproductModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('product', 'product_fk', new ProductConverter()),
			new ProductModel(),
		);
		model.quantity = dto.quantity;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('basket', 'basket_fk', new BasketConverter()),
			new BasketModel(),
		);
		model.dtainit = dto.dtainit;
		model.dtaend = dto.dtaend;
		return model;
	}
	public convertToDto(model?: BasketproductModel): BasketproductDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BasketproductDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('product', 'product_fk', new ProductConverter()),
		);
		dto.quantity = model.quantity;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('basket', 'basket_fk', new BasketConverter()),
		);
		this.convertDateToDto(dto, model, 'dtainit', 'dtainitModel');
		this.convertDateToDto(dto, model, 'dtaend', 'dtaendModel');
		return dto;
	}
	public getEmptyModel(): BasketproductModel {
		const model = new BasketproductModel();
		model.product = ProductUtilConverter.toModel();
		model.basket = BasketUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BasketproductDTO {
		const dto = new BasketproductDTO();
		dto.product_fk = ProductUtilConverter.toDto();
		dto.basket_fk = BasketUtilConverter.toDto();
		return dto;
	}
}

export class BasketproductUtilConverter {
	static toDto(model?: BasketproductModel) {
		const converter = new BasketproductConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BasketproductDTO) {
		const converter = new BasketproductConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BasketproductModel[]) {
		const converter = new BasketproductConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BasketproductDTO[]) {
		const converter = new BasketproductConverter();
		return converter.convertToModelList(dtos);
	}
}
