import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PaymentModel } from '../models/payment.model';
import { PaymentDTO } from '../dtos/payment.dto';
import {
	PriceConverter,
	PriceUtilConverter,
} from '../../shop-warehouse/converters/price.converter';
import { PriceModel } from '../../shop-warehouse/models/price.model';
import { PaymentmethodConverter, PaymentmethodUtilConverter } from './paymentmethod.converter';
import { PaymentmethodModel } from '../models/paymentmethod.model';
import { UserConverter, UserUtilConverter } from '../../authentication/converters/user.converter';
import { UserModel } from '../../authentication/models/user.model';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';

export class PaymentConverter extends BaseApiConverter<PaymentModel, PaymentDTO> {
	public convertToModel(dto?: PaymentDTO): PaymentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PaymentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('price', 'price_fk', new PriceConverter()),
			new PriceModel(),
		);
		this.convertBooleanToModel(dto, model, 'flgin');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('paymentmethod', 'paymentmethod_fk', new PaymentmethodConverter()),
			new PaymentmethodModel(),
		);
		model.dtapayment = dto.dtapayment;
		model.note = dto.note;
		model.causal = dto.causal;
		model.bank_sender = dto.bank_sender;
		model.bank_receiver = dto.bank_receiver;
		this.convertBooleanToModel(dto, model, 'flgconfirm');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tppayment', 'tppayment_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		model.balance_id = dto.balance_id;
		return model;
	}
	public convertToDto(model?: PaymentModel): PaymentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PaymentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('price', 'price_fk', new PriceConverter()),
		);
		this.convertBooleanToDto(dto, model, 'flgin');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('paymentmethod', 'paymentmethod_fk', new PaymentmethodConverter()),
		);
		dto.dtapayment = model.dtapayment;
		dto.note = model.note;
		dto.causal = model.causal;
		dto.bank_sender = model.bank_sender;
		dto.bank_receiver = model.bank_receiver;
		this.convertBooleanToDto(dto, model, 'flgconfirm');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tppayment', 'tppayment_fk', new TypologicalConverter()),
		);
		dto.balance_id = model.balance_id;
		return dto;
	}
	public getEmptyModel(): PaymentModel {
		const model = new PaymentModel();
		model.price = PriceUtilConverter.toModel();
		model.paymentmethod = PaymentmethodUtilConverter.toModel();
		model.user = UserUtilConverter.toModel();
		model.tppayment = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): PaymentDTO {
		const dto = new PaymentDTO();
		dto.price_fk = PriceUtilConverter.toDto();
		dto.paymentmethod_fk = PaymentmethodUtilConverter.toDto();
		dto.user_fk = UserUtilConverter.toDto();
		dto.tppayment_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class PaymentUtilConverter {
	static toDto(model?: PaymentModel) {
		const converter = new PaymentConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: PaymentDTO) {
		const converter = new PaymentConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: PaymentModel[]) {
		const converter = new PaymentConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: PaymentDTO[]) {
		const converter = new PaymentConverter();
		return converter.convertToModelList(dtos);
	}
}
