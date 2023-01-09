import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PaymentmethodModel } from '../models/paymentmethod.model';
import { PaymentmethodDTO } from '../dtos/paymentmethod.dto';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { UserConverter, UserUtilConverter } from '../../authentication/converters/user.converter';
import { UserModel } from '../../authentication/models/user.model';
import {
	ActivityConverter,
	ActivityUtilConverter,
} from '../../authentication/converters/activity.converter';
import { ActivityModel } from '../../authentication/models/activity.model';

export class PaymentmethodConverter extends BaseApiConverter<PaymentmethodModel, PaymentmethodDTO> {
	public convertToModel(dto?: PaymentmethodDTO): PaymentmethodModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PaymentmethodModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.intest = dto.intest;
		model.description = dto.description;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tppaymentmethod', 'tppaymentmethod_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpwebpayment', 'tpwebpayment_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
		);
		model.email = dto.email;
		model.account_id = dto.account_id;
		model.iban = dto.iban;
		model.bban = dto.bban;
		model.swift_bic = dto.swift_bic;
		model.swift = dto.swift;
		model.bic = dto.bic;
		model.abi = dto.abi;
		model.cab = dto.cab;
		model.cin = dto.cin;
		model.bank = dto.bank;
		model.bank_address = dto.bank_address;
		model.cc = dto.cc;
		model.card = dto.card;
		model.card_number = dto.card_number;
		model.card_deadline_m = dto.card_deadline_m;
		model.card_deadline_y = dto.card_deadline_y;
		model.cvv = dto.cvv;
		model.cvv2 = dto.cvv2;
		model.cvc = dto.cvc;
		this.convertBooleanToModel(dto, model, 'typein');
		this.convertBooleanToModel(dto, model, 'typeout');
		this.convertBooleanToModel(dto, model, 'flgonline');
		this.convertBooleanToModel(dto, model, 'flgdefault');
		model.signin = dto.signin;
		model.signout = dto.signout;
		return model;
	}
	public convertToDto(model?: PaymentmethodModel): PaymentmethodDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PaymentmethodDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.intest = model.intest;
		dto.description = model.description;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tppaymentmethod', 'tppaymentmethod_fk', new TypologicalConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpwebpayment', 'tpwebpayment_fk', new TypologicalConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
		dto.email = model.email;
		dto.account_id = model.account_id;
		dto.iban = model.iban;
		dto.bban = model.bban;
		dto.swift_bic = model.swift_bic;
		dto.swift = model.swift;
		dto.bic = model.bic;
		dto.abi = model.abi;
		dto.cab = model.cab;
		dto.cin = model.cin;
		dto.bank = model.bank;
		dto.bank_address = model.bank_address;
		dto.cc = model.cc;
		dto.card = model.card;
		dto.card_number = model.card_number;
		dto.card_deadline_m = model.card_deadline_m;
		dto.card_deadline_y = model.card_deadline_y;
		dto.cvv = model.cvv;
		dto.cvv2 = model.cvv2;
		dto.cvc = model.cvc;
		this.convertBooleanToDto(dto, model, 'typein');
		this.convertBooleanToDto(dto, model, 'typeout');
		this.convertBooleanToDto(dto, model, 'flgonline');
		this.convertBooleanToDto(dto, model, 'flgdefault');
		dto.signin = model.signin;
		dto.signout = model.signout;
		return dto;
	}
	public getEmptyModel(): PaymentmethodModel {
		const model = new PaymentmethodModel();
		model.tppaymentmethod = TypologicalUtilConverter.toModel();
		model.tpwebpayment = TypologicalUtilConverter.toModel();
		model.user = UserUtilConverter.toModel();
		model.activity = ActivityUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): PaymentmethodDTO {
		const dto = new PaymentmethodDTO();
		dto.tppaymentmethod_fk = TypologicalUtilConverter.toDto();
		dto.tpwebpayment_fk = TypologicalUtilConverter.toDto();
		dto.user_fk = UserUtilConverter.toDto();
		dto.activity_fk = ActivityUtilConverter.toDto();
		return dto;
	}
}

export class PaymentmethodUtilConverter {
	static toDto(model?: PaymentmethodModel) {
		const converter = new PaymentmethodConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: PaymentmethodDTO) {
		const converter = new PaymentmethodConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: PaymentmethodModel[]) {
		const converter = new PaymentmethodConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: PaymentmethodDTO[]) {
		const converter = new PaymentmethodConverter();
		return converter.convertToModelList(dtos);
	}
}
