import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { BalanceFlowModel } from '../models/balance-flow.model';
import { BalanceFlowDTO } from '../dtos/balance-flow.dto';
import { PaymentUtilConverter } from './payment.converter';

export class BalanceFlowConverter extends BaseApiConverter<BalanceFlowModel, BalanceFlowDTO> {
	public convertToModel(dto?: BalanceFlowDTO): BalanceFlowModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BalanceFlowModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.priceIn = dto.priceIn;
		model.priceOut = dto.priceOut;
		model.ivaIn = dto.ivaIn;
		model.ivaOut = dto.ivaOut;
		model.discountIn = dto.discountIn;
		model.discountOut = dto.discountOut;
		model.taxIn = dto.taxIn;
		model.taxOut = dto.taxOut;
		model.totalIn = dto.totalIn;
		model.totalOut = dto.totalOut;
		model.totalsumIn = dto.totalsumIn;
		model.totalsumOut = dto.totalsumOut;
		model.currencyCod = dto.currencyCod;
		model.currencyTitle = dto.currencyTitle;
		model.currencySymbol = dto.currencySymbol;
		model.currencyIcon = dto.currencyIcon;
		model.deposit = dto.deposit;
		model.payed = dto.payed;
		model.payments = PaymentUtilConverter.toModelList(dto.payments);
		model.pages = dto.pages;
		model.count = dto.count;
		model.groupcod = dto.groupcod;
		model.month = dto.month;
		return model;
	}
	public convertToDto(model?: BalanceFlowModel): BalanceFlowDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BalanceFlowDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.priceIn = model.priceIn;
		dto.priceOut = model.priceOut;
		dto.ivaIn = model.ivaIn;
		dto.ivaOut = model.ivaOut;
		dto.discountIn = model.discountIn;
		dto.discountOut = model.discountOut;
		dto.taxIn = model.taxIn;
		dto.taxOut = model.taxOut;
		dto.totalIn = model.totalIn;
		dto.totalOut = model.totalOut;
		dto.totalsumIn = model.totalsumIn;
		dto.totalsumOut = model.totalsumOut;
		dto.currencyCod = model.currencyCod;
		dto.currencyTitle = model.currencyTitle;
		dto.currencySymbol = model.currencySymbol;
		dto.currencyIcon = model.currencyIcon;
		dto.deposit = model.deposit;
		dto.payed = model.payed;
		dto.payments = PaymentUtilConverter.toDtoList(model.payments);
		dto.pages = model.pages;
		dto.count = model.count;
		dto.groupcod = model.groupcod;
		dto.month = model.month;
		return dto;
	}
	public getEmptyModel(): BalanceFlowModel {
		const model = new BalanceFlowModel();
		return model;
	}
	public getEmptyDto(): BalanceFlowDTO {
		const dto = new BalanceFlowDTO();
		return dto;
	}
}

export class BalanceUtilConverter {
	static toDto(model?: BalanceFlowModel) {
		const converter = new BalanceFlowConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BalanceFlowDTO) {
		const converter = new BalanceFlowConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BalanceFlowModel[]) {
		const converter = new BalanceFlowConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BalanceFlowDTO[]) {
		const converter = new BalanceFlowConverter();
		return converter.convertToModelList(dtos);
	}
}
