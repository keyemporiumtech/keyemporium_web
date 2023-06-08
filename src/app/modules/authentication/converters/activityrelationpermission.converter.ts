import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ActivityrelationpermissionDTO } from '../dtos/activityrelationpermission.dto';
import { ActivityrelationModel } from '../models/activityrelation.model';
import { ActivityrelationpermissionModel } from '../models/activityrelationpermission.model';
import { PermissionModel } from '../models/permission.model';
import {
	ActivityrelationConverter,
	ActivityrelationUtilConverter,
} from './activityrelation.converter';
import { PermissionConverter, PermissionUtilConverter } from './permission.converter';

export class ActivityrelationpermissionConverter extends BaseApiConverter<
	ActivityrelationpermissionModel,
	ActivityrelationpermissionDTO
> {
	public convertToModel(dto?: ActivityrelationpermissionDTO): ActivityrelationpermissionModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ActivityrelationpermissionModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk(
				'activityrelation',
				'activityrelation_fk',
				new ActivityrelationConverter(),
			),
			new ActivityrelationModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('permission', 'permission_fk', new PermissionConverter()),
			new PermissionModel(),
		);
		return model;
	}
	public convertToDto(model?: ActivityrelationpermissionModel): ActivityrelationpermissionDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ActivityrelationpermissionDTO();
		this.convertCommonPropertiesToDto(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk(
				'activityrelation',
				'activityrelation_fk',
				new ActivityrelationConverter(),
			),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('permission', 'permission_fk', new PermissionConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ActivityrelationpermissionModel {
		const model = new ActivityrelationpermissionModel();
		model.activityrelation = ActivityrelationUtilConverter.toModel();
		model.permission = PermissionUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ActivityrelationpermissionDTO {
		const dto = new ActivityrelationpermissionDTO();
		dto.activityrelation_fk = ActivityrelationUtilConverter.toDto();
		dto.permission_fk = PermissionUtilConverter.toDto();
		return dto;
	}
}

export class ActivityrelationpermissionUtilConverter {
	static toDto(model?: ActivityrelationpermissionModel) {
		const converter = new ActivityrelationpermissionConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ActivityrelationpermissionDTO) {
		const converter = new ActivityrelationpermissionConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ActivityrelationpermissionModel[]) {
		const converter = new ActivityrelationpermissionConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ActivityrelationpermissionDTO[]) {
		const converter = new ActivityrelationpermissionConverter();
		return converter.convertToModelList(dtos);
	}
}
