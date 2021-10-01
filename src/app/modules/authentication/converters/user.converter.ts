import { TypeConverter } from '@ddc/kit';
import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UserDTO } from '../dtos/user.dto';
import { EnumSexType } from '../enums/sex-type.enum';
import { UserModel } from '../models/user.model';

export class UserConverter extends BaseApiConverter<UserModel, UserDTO> {
	private sexEnumConverter = new TypeConverter<string, EnumSexType>();

	public convertToModel(dto?: UserDTO): UserModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new UserModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.username = dto.username;
		model.password = dto.password;
		model.passclean = dto.passclean;
		model.cf = dto.cf;
		model.name = dto.name;
		model.surname = dto.surname;
		model.sex = dto.sex;
		model.born = dto.born;
		// enums
		model.sexEnum = this.sexEnumConverter.convertToB(dto.sex);
		return model;
	}
	public convertToDto(model?: UserModel): UserDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new UserDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.username = model.username;
		dto.password = model.password;
		dto.passclean = model.passclean;
		dto.cf = model.cf;
		dto.name = model.name;
		dto.surname = model.surname;
		dto.sex = model.sex;
		this.convertDateToDto(dto, model, 'born', 'bornModel');
		return dto;
	}
	public getEmptyModel(): UserModel {
		const model = new UserModel();
		return model;
	}
	public getEmptyDto(): UserDTO {
		const dto = new UserDTO();
		return dto;
	}
}

export class UserUtilConverter {
	static toDto(model?: UserModel) {
		const converter = new UserConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: UserDTO) {
		const converter = new UserConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: UserModel[]) {
		const converter = new UserConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: UserDTO[]) {
		const converter = new UserConverter();
		return converter.convertToModelList(dtos);
	}
}
