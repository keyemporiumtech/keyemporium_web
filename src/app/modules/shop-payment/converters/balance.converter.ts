import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { BalanceModel } from '../models/balance.model';
import { BalanceDTO } from '../dtos/balance.dto';
import { UserConverter, UserUtilConverter } from '../../authentication/converters/user.converter';
import { UserModel } from '../../authentication/models/user.model';
import {
	ActivityConverter,
	ActivityUtilConverter,
} from '../../authentication/converters/activity.converter';
import { ActivityModel } from '../../authentication/models/activity.model';
import {
	CurrencyConverter,
	CurrencyUtilConverter,
} from '../../util-currency/converters/currency.converter';
import { CurrencyModel } from '../../util-currency/models/currency.model';

export class BalanceConverter extends BaseApiConverter<BalanceModel, BalanceDTO> {
	public convertToModel(dto?: BalanceDTO): BalanceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BalanceModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.description = dto.description;
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
		model.initdeposit = dto.initdeposit;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
			new CurrencyModel(),
		);
		return model;
	}
	public convertToDto(model?: BalanceModel): BalanceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BalanceDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.description = model.description;
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
		dto.initdeposit = model.initdeposit;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
		);
		return dto;
	}
	public getEmptyModel(): BalanceModel {
		const model = new BalanceModel();
		model.user = UserUtilConverter.toModel();
		model.activity = ActivityUtilConverter.toModel();
		model.currency = CurrencyUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BalanceDTO {
		const dto = new BalanceDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.activity_fk = ActivityUtilConverter.toDto();
		dto.currency_fk = CurrencyUtilConverter.toDto();
		return dto;
	}
}

export class BalanceUtilConverter {
	static toDto(model?: BalanceModel) {
		const converter = new BalanceConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BalanceDTO) {
		const converter = new BalanceConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BalanceModel[]) {
		const converter = new BalanceConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BalanceDTO[]) {
		const converter = new BalanceConverter();
		return converter.convertToModelList(dtos);
	}
}
