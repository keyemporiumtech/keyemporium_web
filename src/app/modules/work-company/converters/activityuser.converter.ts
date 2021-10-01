import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ActivityuserDTO } from '../dtos/activityuser.dto';
import { ActivityuserModel } from '../models/activityuser.model';
import {
	ActivityConverter,
	ActivityUtilConverter,
} from '../../authentication/converters/activity.converter';
import { UserConverter, UserUtilConverter } from '../../authentication/converters/user.converter';
import { UserModel } from '../../authentication/models/user.model';
import { ActivityModel } from '../../authentication/models/activity.model';
import { WorkroleModel } from '../models/workrole.model';
import { WorkroleConverter, WorkroleUtilConverter } from './workrole.converter';

export class ActivityuserConverter extends BaseApiConverter<ActivityuserModel, ActivityuserDTO> {
	public convertToModel(dto?: ActivityuserDTO): ActivityuserModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ActivityuserModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
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
			this.getPropertyForFk('role', 'role_fk', new WorkroleConverter()),
			new WorkroleModel(),
		);
		return model;
	}
	public convertToDto(model?: ActivityuserModel): ActivityuserDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ActivityuserDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('role', 'role_fk', new WorkroleConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ActivityuserModel {
		const model = new ActivityuserModel();
		model.activity = ActivityUtilConverter.toModel();
		model.user = UserUtilConverter.toModel();
		model.role = WorkroleUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ActivityuserDTO {
		const dto = new ActivityuserDTO();
		dto.activity_fk = ActivityUtilConverter.toDto();
		dto.user_fk = UserUtilConverter.toDto();
		dto.role_fk = WorkroleUtilConverter.toDto();
		return dto;
	}
}

export class ActivityuserUtilConverter {
	static toDto(model?: ActivityuserModel) {
		const converter = new ActivityuserConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ActivityuserDTO) {
		const converter = new ActivityuserConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ActivityuserModel[]) {
		const converter = new ActivityuserConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ActivityuserDTO[]) {
		const converter = new ActivityuserConverter();
		return converter.convertToModelList(dtos);
	}
}
