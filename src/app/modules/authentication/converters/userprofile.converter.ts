import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UserprofileDTO } from '../dtos/userprofile.dto';
import { ActivityModel } from '../models/activity.model';
import { ProfileModel } from '../models/profile.model';
import { UserModel } from '../models/user.model';
import { UserprofileModel } from '../models/userprofile.model';
import { ActivityConverter, ActivityUtilConverter } from './activity.converter';
import { ProfileConverter, ProfileUtilConverter } from './profile.converter';
import { UserConverter, UserUtilConverter } from './user.converter';

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
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
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
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
		return dto;
	}
	public getEmptyModel(): UserprofileModel {
		const model = new UserprofileModel();
		model.user = UserUtilConverter.toModel();
		model.profile = ProfileUtilConverter.toModel();
		model.activity = ActivityUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): UserprofileDTO {
		const dto = new UserprofileDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.profile_fk = ProfileUtilConverter.toDto();
		dto.activity_fk = ActivityUtilConverter.toDto();
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
