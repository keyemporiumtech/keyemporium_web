import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ProfilepermissionDTO } from '../dtos/profilepermission.dto';
import { ProfilepermissionModel } from '../models/profilepermission.model';
import { ProfileConverter, ProfileUtilConverter } from './profile.converter';
import { ProfileModel } from '../models/profile.model';
import { PermissionConverter, PermissionUtilConverter } from './permission.converter';
import { PermissionModel } from '../models/permission.model';

export class ProfilepermissionConverter extends BaseApiConverter<
	ProfilepermissionModel,
	ProfilepermissionDTO
> {
	public convertToModel(dto?: ProfilepermissionDTO): ProfilepermissionModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProfilepermissionModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('profile', 'profile_fk', new ProfileConverter()),
			new ProfileModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('permission', 'permission_fk', new PermissionConverter()),
			new PermissionModel(),
		);
		return model;
	}
	public convertToDto(model?: ProfilepermissionModel): ProfilepermissionDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProfilepermissionDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('profile', 'profile_fk', new ProfileConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('permission', 'permission_fk', new PermissionConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ProfilepermissionModel {
		const model = new ProfilepermissionModel();
		model.profile = ProfileUtilConverter.toModel();
		model.permission = PermissionUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProfilepermissionDTO {
		const dto = new ProfilepermissionDTO();
		dto.profile_fk = ProfileUtilConverter.toDto();
		dto.permission_fk = PermissionUtilConverter.toDto();
		return dto;
	}
}

export class ProfilepermissionUtilConverter {
	static toDto(model?: ProfilepermissionModel) {
		const converter = new ProfilepermissionConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ProfilepermissionDTO) {
		const converter = new ProfilepermissionConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ProfilepermissionModel[]) {
		const converter = new ProfilepermissionConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ProfilepermissionDTO[]) {
		const converter = new ProfilepermissionConverter();
		return converter.convertToModelList(dtos);
	}
}
