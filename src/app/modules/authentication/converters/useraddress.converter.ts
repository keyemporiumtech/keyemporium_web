import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UseraddressDTO } from '../dtos/useraddress.dto';
import { UseraddressModel } from '../models/useraddress.model';
import { UserUtilConverter, UserConverter } from './user.converter';
import { UserModel } from '../models/user.model';
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

export class UseraddressConverter extends BaseApiConverter<UseraddressModel, UseraddressDTO> {
	private tpaddressEnumConverter = new TypeConverter<string, EnumAddressType>();

	public convertToModel(dto?: UseraddressDTO): UseraddressModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new UseraddressModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.group = dto.group;
		this.convertBooleanToModel(dto, model, 'flgprincipal');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
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
	public convertToDto(model?: UseraddressModel): UseraddressDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new UseraddressDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.group = model.group;
		this.convertBooleanToDto(dto, model, 'flgprincipal');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
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
	public getEmptyModel(): UseraddressModel {
		const model = new UseraddressModel();
		model.user = UserUtilConverter.toModel();
		model.address = AddressUtilConverter.toModel();
		model.tpaddress = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): UseraddressDTO {
		const dto = new UseraddressDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.address_fk = AddressUtilConverter.toDto();
		dto.tpaddress_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class UseraddressUtilConverter {
	static toDto(model?: UseraddressModel) {
		const converter = new UseraddressConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: UseraddressDTO) {
		const converter = new UseraddressConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: UseraddressModel[]) {
		const converter = new UseraddressConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: UseraddressDTO[]) {
		const converter = new UseraddressConverter();
		return converter.convertToModelList(dtos);
	}
}
