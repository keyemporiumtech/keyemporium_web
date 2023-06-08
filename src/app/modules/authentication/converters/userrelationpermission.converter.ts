import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UserrelationpermissionDTO } from '../dtos/userrelationpermission.dto';
import { PermissionModel } from '../models/permission.model';
import { UserrelationModel } from '../models/userrelation.model';
import { UserrelationpermissionModel } from '../models/userrelationpermission.model';
import { PermissionConverter, PermissionUtilConverter } from './permission.converter';
import { UserrelationConverter, UserrelationUtilConverter } from './userrelation.converter';

export class UserrelationpermissionConverter extends BaseApiConverter<
	UserrelationpermissionModel,
	UserrelationpermissionDTO
> {
	public convertToModel(dto?: UserrelationpermissionDTO): UserrelationpermissionModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new UserrelationpermissionModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('userrelation', 'userrelation_fk', new UserrelationConverter()),
			new UserrelationModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('permission', 'permission_fk', new PermissionConverter()),
			new PermissionModel(),
		);
		return model;
	}
	public convertToDto(model?: UserrelationpermissionModel): UserrelationpermissionDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new UserrelationpermissionDTO();
		this.convertCommonPropertiesToDto(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('userrelation', 'userrelation_fk', new UserrelationConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('permission', 'permission_fk', new PermissionConverter()),
		);
		return dto;
	}
	public getEmptyModel(): UserrelationpermissionModel {
		const model = new UserrelationpermissionModel();
		model.userrelation = UserrelationUtilConverter.toModel();
		model.permission = PermissionUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): UserrelationpermissionDTO {
		const dto = new UserrelationpermissionDTO();
		dto.userrelation_fk = UserrelationUtilConverter.toDto();
		dto.permission_fk = PermissionUtilConverter.toDto();
		return dto;
	}
}

export class UserrelationpermissionUtilConverter {
	static toDto(model?: UserrelationpermissionModel) {
		const converter = new UserrelationpermissionConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: UserrelationpermissionDTO) {
		const converter = new UserrelationpermissionConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: UserrelationpermissionModel[]) {
		const converter = new UserrelationpermissionConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: UserrelationpermissionDTO[]) {
		const converter = new UserrelationpermissionConverter();
		return converter.convertToModelList(dtos);
	}
}
