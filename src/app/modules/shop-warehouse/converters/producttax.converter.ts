import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ProducttaxModel } from '../models/producttax.model';
import { ProducttaxDTO } from '../dtos/producttax.dto';
import { ProductConverter, ProductUtilConverter } from './product.converter';
import { ProductModel } from '../models/product.model';
import {
	CurrencyConverter,
	CurrencyUtilConverter,
} from '../../util-currency/converters/currency.converter';
import { CurrencyModel } from '../../util-currency/models/currency.model';

export class ProducttaxConverter extends BaseApiConverter<ProducttaxModel, ProducttaxDTO> {
	public convertToModel(dto?: ProducttaxDTO): ProducttaxModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProducttaxModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('product', 'product_fk', new ProductConverter()),
			new ProductModel(),
		);
		model.tax = dto.tax;
		model.tax_percent = dto.tax_percent;
		model.taxdescription = dto.taxdescription;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
			new CurrencyModel(),
		);
		return model;
	}
	public convertToDto(model?: ProducttaxModel): ProducttaxDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProducttaxDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('product', 'product_fk', new ProductConverter()),
		);
		dto.tax = model.tax;
		dto.tax_percent = model.tax_percent;
		dto.taxdescription = model.taxdescription;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
		);
		return dto;
	}
	public getEmptyModel(): ProducttaxModel {
		const model = new ProducttaxModel();
		model.product = ProductUtilConverter.toModel();
		model.currency = CurrencyUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProducttaxDTO {
		const dto = new ProducttaxDTO();
		dto.product_fk = ProductUtilConverter.toDto();
		dto.currency_fk = CurrencyUtilConverter.toDto();
		return dto;
	}
}

export class ProducttaxUtilConverter {
	static toDto(model?: ProducttaxModel) {
		const converter = new ProducttaxConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ProducttaxDTO) {
		const converter = new ProducttaxConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ProducttaxModel[]) {
		const converter = new ProducttaxConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ProducttaxDTO[]) {
		const converter = new ProducttaxConverter();
		return converter.convertToModelList(dtos);
	}
}
