import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PriceModel } from '../models/price.model';
import { PriceDTO } from '../dtos/price.dto';
import {
	CurrencyConverter,
	CurrencyUtilConverter,
} from '../../util-currency/converters/currency.converter';
import { CurrencyModel } from '../../util-currency/models/currency.model';

export class PriceConverter extends BaseApiConverter<PriceModel, PriceDTO> {
	public convertToModel(dto?: PriceDTO): PriceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PriceModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.price = dto.price;
		model.total = dto.total;
		model.iva = dto.iva;
		model.iva_percent = dto.iva_percent;
		model.discount = dto.discount;
		model.discount_percent = dto.discount_percent;
		model.tax = dto.tax;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
			new CurrencyModel(),
		);
		model.totalsum = dto.totalsum;
		return model;
	}
	public convertToDto(model?: PriceModel): PriceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PriceDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.price = model.price;
		dto.total = model.total;
		dto.iva = model.iva;
		dto.iva_percent = model.iva_percent;
		dto.discount = model.discount;
		dto.discount_percent = model.discount_percent;
		dto.tax = model.tax;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
		);
		dto.totalsum = model.totalsum;
		return dto;
	}
	public getEmptyModel(): PriceModel {
		const model = new PriceModel();
		model.currency = CurrencyUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): PriceDTO {
		const dto = new PriceDTO();
		dto.currency_fk = CurrencyUtilConverter.toDto();
		return dto;
	}
}

export class PriceUtilConverter {
	static toDto(model?: PriceModel) {
		const converter = new PriceConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: PriceDTO) {
		const converter = new PriceConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: PriceModel[]) {
		const converter = new PriceConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: PriceDTO[]) {
		const converter = new PriceConverter();
		return converter.convertToModelList(dtos);
	}
}
