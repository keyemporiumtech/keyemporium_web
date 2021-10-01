import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UserprofileDTO } from '../dtos/userprofile.dto';
import { UserprofileModel } from '../models/userprofile.model';
import { ProfileConverter, ProfileUtilConverter } from './profile.converter';
import { ProfileModel } from '../models/profile.model';
import { UserUtilConverter, UserConverter } from './user.converter';
import { UserModel } from '../models/user.model';

export class UserprofileConverter extends BaseApiConverter<UserprofileModel, UserprofileDTO> {
	public convertToModel(dto?: UserprofileDTO): UserprofileModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new UserprofileModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('profile', 'profile_fk', new ProfileConverter()),
			new ProfileModel(),
		);

		return model;
	}
	public convertToDto(model?: UserprofileModel): UserprofileDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new UserprofileDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('profile', 'profile_fk', new ProfileConverter()),
		);
		return dto;
	}
	public getEmptyModel(): UserprofileModel {
		const model = new UserprofileModel();
		model.user = UserUtilConverter.toModel();
		model.profile = ProfileUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): UserprofileDTO {
		const dto = new UserprofileDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.profile_fk = ProfileUtilConverter.toDto();
		return dto;
	}
}

export class UserprofileUtilConverter {
	static toDto(model?: UserprofileModel) {
		const converter = new UserprofileConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: UserprofileDTO) {
		const converter = new UserprofileConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: UserprofileModel[]) {
		const converter = new UserprofileConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: UserprofileDTO[]) {
		const converter = new UserprofileConverter();
		return converter.convertToModelList(dtos);
	}
}
