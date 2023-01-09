import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { BalancepaymentModel } from '../models/balancepayment.model';
import { BalancepaymentDTO } from '../dtos/balancepayment.dto';
import { BalanceConverter, BalanceUtilConverter } from './balance.converter';
import { BalanceModel } from '../models/balance.model';
import { PaymentConverter, PaymentUtilConverter } from './payment.converter';
import { PaymentModel } from '../models/payment.model';

export class BalancepaymentConverter extends BaseApiConverter<
	BalancepaymentModel,
	BalancepaymentDTO
> {
	public convertToModel(dto?: BalancepaymentDTO): BalancepaymentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BalancepaymentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('balance', 'balance_fk', new BalanceConverter()),
			new BalanceModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('payment', 'payment_fk', new PaymentConverter()),
			new PaymentModel(),
		);
		return model;
	}
	public convertToDto(model?: BalancepaymentModel): BalancepaymentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BalancepaymentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('balance', 'balance_fk', new BalanceConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('payment', 'payment_fk', new PaymentConverter()),
		);
		return dto;
	}
	public getEmptyModel(): BalancepaymentModel {
		const model = new BalancepaymentModel();
		model.balance = BalanceUtilConverter.toModel();
		model.payment = PaymentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BalancepaymentDTO {
		const dto = new BalancepaymentDTO();
		dto.balance_fk = BalanceUtilConverter.toDto();
		dto.payment_fk = PaymentUtilConverter.toDto();
		return dto;
	}
}

export class BalancepaymentUtilConverter {
	static toDto(model?: BalancepaymentModel) {
		const converter = new BalancepaymentConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BalancepaymentDTO) {
		const converter = new BalancepaymentConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BalancepaymentModel[]) {
		const converter = new BalancepaymentConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BalancepaymentDTO[]) {
		const converter = new BalancepaymentConverter();
		return converter.convertToModelList(dtos);
	}
}
