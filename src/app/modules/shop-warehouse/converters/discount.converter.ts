import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { DiscountModel } from '../models/discount.model';
import { DiscountDTO } from '../dtos/discount.dto';
import {
	CurrencyConverter,
	CurrencyUtilConverter,
} from '../../util-currency/converters/currency.converter';
import { CurrencyModel } from '../../util-currency/models/currency.model';

export class DiscountConverter extends BaseApiConverter<DiscountModel, DiscountDTO> {
	public convertToModel(dto?: DiscountDTO): DiscountModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new DiscountModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.discount = dto.discount;
		model.discount_percent = dto.discount_percent;
		model.description = dto.description;
		model.levelquantity = dto.levelquantity;
		model.levelprice = dto.levelprice;
		model.dtainit = dto.dtainit;
		model.dtaend = dto.dtaend;
		this.convertBooleanToModel(dto, model, 'flgsystem');
		this.convertBooleanToModel(dto, model, 'flglevelbasket');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
			new CurrencyModel(),
		);
		return model;
	}
	public convertToDto(model?: DiscountModel): DiscountDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new DiscountDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.discount = model.discount;
		dto.discount_percent = model.discount_percent;
		dto.description = model.description;
		dto.levelquantity = model.levelquantity;
		dto.levelprice = model.levelprice;
		dto.dtainit = model.dtainit;
		dto.dtaend = model.dtaend;
		this.convertBooleanToDto(dto, model, 'flgsystem');
		this.convertBooleanToDto(dto, model, 'flglevelbasket');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
		);
		return dto;
	}
	public getEmptyModel(): DiscountModel {
		const model = new DiscountModel();
		model.currency = CurrencyUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): DiscountDTO {
		const dto = new DiscountDTO();
		dto.currency_fk = CurrencyUtilConverter.toDto();
		return dto;
	}
}

export class DiscountUtilConverter {
	static toDto(model?: DiscountModel) {
		const converter = new DiscountConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: DiscountDTO) {
		const converter = new DiscountConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: DiscountModel[]) {
		const converter = new DiscountConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: DiscountDTO[]) {
		const converter = new DiscountConverter();
		return converter.convertToModelList(dtos);
	}
}
