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
		return model;
	}
	public convertToDto(model?: BalanceFlowModel): BalanceFlowDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BalanceFlowDTO();
		this.convertCommonPropertiesToDto(dto, model);
		model.priceIn = model.priceIn;
		model.priceOut = model.priceOut;
		model.ivaIn = model.ivaIn;
		model.ivaOut = model.ivaOut;
		model.discountIn = model.discountIn;
		model.discountOut = model.discountOut;
		model.taxIn = model.taxIn;
		model.taxOut = model.taxOut;
		model.totalIn = model.totalIn;
		model.totalOut = model.totalOut;
		model.totalsumIn = model.totalsumIn;
		model.totalsumOut = model.totalsumOut;
		model.currencyCod = model.currencyCod;
		model.currencyTitle = model.currencyTitle;
		model.currencySymbol = model.currencySymbol;
		model.currencyIcon = model.currencyIcon;
		model.deposit = model.deposit;
		model.payed = model.payed;
		dto.payments = PaymentUtilConverter.toDtoList(model.payments);
		dto.pages = model.pages;
		dto.count = model.count;
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
