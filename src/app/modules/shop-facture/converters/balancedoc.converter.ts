import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	BalanceConverter,
	BalanceUtilConverter,
} from '../../shop-payment/converters/balance.converter';
import {
	BasketConverter,
	BasketUtilConverter,
} from '../../shop-payment/converters/basket.converter';
import { BalanceModel } from '../../shop-payment/models/balance.model';
import { BasketModel } from '../../shop-payment/models/basket.model';
import {
	PriceConverter,
	PriceUtilConverter,
} from '../../shop-warehouse/converters/price.converter';
import { PriceModel } from '../../shop-warehouse/models/price.model';
import {
	CurrencyConverter,
	CurrencyUtilConverter,
} from '../../util-currency/converters/currency.converter';
import { CurrencyModel } from '../../util-currency/models/currency.model';
import { BalancedocDTO } from '../dtos/balancedoc.dto';
import { BalancedocModel } from '../models/balancedoc.model';
import { DocactorModel } from '../models/docactor.model';
import { DocactorConverter, DocactorUtilConverter } from './docactor.converter';

export class BalancedocConverter extends BaseApiConverter<BalancedocModel, BalancedocDTO> {
	public convertToModel(dto?: BalancedocDTO): BalancedocModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BalancedocModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('actorsender', 'actorsender_fk', new DocactorConverter()),
			new DocactorModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('actorreceiver', 'actorreceiver_fk', new DocactorConverter()),
			new DocactorModel(),
		);
		model.causal = dto.causal;
		model.bank = dto.bank;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('price', 'price_fk', new PriceConverter()),
			new PriceModel(),
		);
		model.deposit = dto.deposit;
		model.payed = dto.payed;
		model.dtainit = dto.dtainit;
		model.dtaend = dto.dtaend;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpbalancedoc', 'tpbalancedoc_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('associated', 'associated_fk', new BalancedocConverter()),
			new BalancedocModel(),
		);
		this.convertBooleanToModel(dto, model, 'payclose');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('balance', 'balance_fk', new BalanceConverter()),
			new BalanceModel(),
		);
		this.convertBooleanToModel(dto, model, 'flgtotalbyentry');
		this.convertBooleanToModel(dto, model, 'flgin');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
			new CurrencyModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('basket', 'basket_fk', new BasketConverter()),
			new BasketModel(),
		);
		return model;
	}
	public convertToDto(model?: BalancedocModel): BalancedocDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BalancedocDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('actorsender', 'actorsender_fk', new DocactorConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('actorreceiver', 'actorreceiver_fk', new DocactorConverter()),
		);
		dto.causal = model.causal;
		dto.bank = model.bank;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('price', 'price_fk', new PriceConverter()),
		);
		dto.deposit = model.deposit;
		dto.payed = model.payed;
		dto.dtainit = model.dtainit;
		dto.dtaend = model.dtaend;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpbalancedoc', 'tpbalancedoc_fk', new TypologicalConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('associated', 'associated_fk', new BalancedocConverter()),
		);
		this.convertBooleanToDto(dto, model, 'payclose');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('balance', 'balance_fk', new BalanceConverter()),
		);
		this.convertBooleanToDto(dto, model, 'flgtotalbyentry');
		this.convertBooleanToDto(dto, model, 'flgin');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('basket', 'basket_fk', new BasketConverter()),
		);
		return dto;
	}
	public getEmptyModel(): BalancedocModel {
		const model = new BalancedocModel();
		model.actorsender = DocactorUtilConverter.toModel();
		model.actorreceiver = DocactorUtilConverter.toModel();
		model.price = PriceUtilConverter.toModel();
		model.tpbalancedoc = TypologicalUtilConverter.toModel();
		// model.associated = BalancedocUtilConverter.toModel();
		model.balance = BalanceUtilConverter.toModel();
		model.currency = CurrencyUtilConverter.toModel();
		model.basket = BasketUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BalancedocDTO {
		const dto = new BalancedocDTO();
		dto.actorsender_fk = DocactorUtilConverter.toDto();
		dto.actorreceiver_fk = DocactorUtilConverter.toDto();
		dto.price_fk = PriceUtilConverter.toDto();
		dto.tpbalancedoc_fk = TypologicalUtilConverter.toDto();
		// dto.associated_fk = BalancedocUtilConverter.toDto();
		dto.balance_fk = BalanceUtilConverter.toDto();
		dto.currency_fk = CurrencyUtilConverter.toDto();
		dto.basket_fk = BasketUtilConverter.toDto();
		return dto;
	}
}

export class BalancedocUtilConverter {
	static toDto(model?: BalancedocModel) {
		const converter = new BalancedocConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BalancedocDTO) {
		const converter = new BalancedocConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BalancedocModel[]) {
		const converter = new BalancedocConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BalancedocDTO[]) {
		const converter = new BalancedocConverter();
		return converter.convertToModelList(dtos);
	}
}
