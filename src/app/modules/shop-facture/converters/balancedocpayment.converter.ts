import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	PaymentConverter,
	PaymentUtilConverter,
} from '../../shop-payment/converters/payment.converter';
import { PaymentModel } from '../../shop-payment/models/payment.model';
import { BalancedocpaymentDTO } from '../dtos/balancedocpayment.dto';
import { BalancedocModel } from '../models/balancedoc.model';
import { BalancedocpaymentModel } from '../models/balancedocpayment.model';
import { BalancedocConverter, BalancedocUtilConverter } from './balancedoc.converter';

export class BalancedocpaymentConverter extends BaseApiConverter<
	BalancedocpaymentModel,
	BalancedocpaymentDTO
> {
	public convertToModel(dto?: BalancedocpaymentDTO): BalancedocpaymentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BalancedocpaymentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('balancedoc', 'balancedoc_fk', new BalancedocConverter()),
			new BalancedocModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('payment', 'payment_fk', new PaymentConverter()),
			new PaymentModel(),
		);
		return model;
	}
	public convertToDto(model?: BalancedocpaymentModel): BalancedocpaymentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BalancedocpaymentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('balancedoc', 'balancedoc_fk', new BalancedocConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('payment', 'payment_fk', new PaymentConverter()),
		);
		return dto;
	}
	public getEmptyModel(): BalancedocpaymentModel {
		const model = new BalancedocpaymentModel();
		model.balancedoc = BalancedocUtilConverter.toModel();
		model.payment = PaymentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BalancedocpaymentDTO {
		const dto = new BalancedocpaymentDTO();
		dto.balancedoc_fk = BalancedocUtilConverter.toDto();
		dto.payment_fk = PaymentUtilConverter.toDto();
		return dto;
	}
}

export class BalancedocpaymentUtilConverter {
	static toDto(model?: BalancedocpaymentModel) {
		const converter = new BalancedocpaymentConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BalancedocpaymentDTO) {
		const converter = new BalancedocpaymentConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BalancedocpaymentModel[]) {
		const converter = new BalancedocpaymentConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BalancedocpaymentDTO[]) {
		const converter = new BalancedocpaymentConverter();
		return converter.convertToModelList(dtos);
	}
}
