import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ActivityaddressDTO } from '../dtos/activityaddress.dto';
import { ActivityaddressModel } from '../models/activityaddress.model';
import { ActivityUtilConverter, ActivityConverter } from './activity.converter';
import { ActivityModel } from '../models/activity.model';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { TypeConverter } from '@ddc/kit';
import {
	AddressConverter,
	AddressUtilConverter,
} from '../../localesystem/converters/address.converter';
import { AddressModel } from '../../localesystem/models/address.model';
import { EnumAddressType } from '../../localesystem/enums/address-type.enum';

export class ActivityaddressConverter extends BaseApiConverter<
	ActivityaddressModel,
	ActivityaddressDTO
> {
	private tpaddressEnumConverter = new TypeConverter<string, EnumAddressType>();

	public convertToModel(dto?: ActivityaddressDTO): ActivityaddressModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ActivityaddressModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.group = dto.group;
		this.convertBooleanToModel(dto, model, 'flgprincipal');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('address', 'address_fk', new AddressConverter()),
			new AddressModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpaddress', 'tpaddress_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		// enums
		model.tpaddressEnum = this.tpaddressEnumConverter.convertToB(dto.tpaddress);
		return model;
	}
	public convertToDto(model?: ActivityaddressModel): ActivityaddressDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ActivityaddressDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.group = model.group;
		this.convertBooleanToDto(dto, model, 'flgprincipal');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('address', 'address_fk', new AddressConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpaddress', 'tpaddress_fk', new TypologicalConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ActivityaddressModel {
		const model = new ActivityaddressModel();
		model.activity = ActivityUtilConverter.toModel();
		model.address = AddressUtilConverter.toModel();
		model.tpaddress = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ActivityaddressDTO {
		const dto = new ActivityaddressDTO();
		dto.activity_fk = ActivityUtilConverter.toDto();
		dto.address_fk = AddressUtilConverter.toDto();
		dto.tpaddress_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class ActivityaddressUtilConverter {
	static toDto(model?: ActivityaddressModel) {
		const converter = new ActivityaddressConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ActivityaddressDTO) {
		const converter = new ActivityaddressConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ActivityaddressModel[]) {
		const converter = new ActivityaddressConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ActivityaddressDTO[]) {
		const converter = new ActivityaddressConverter();
		return converter.convertToModelList(dtos);
	}
}
