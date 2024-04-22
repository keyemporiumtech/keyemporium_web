import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UserConverter, UserUtilConverter } from '../../authentication/converters/user.converter';
import { UserModel } from '../../authentication/models/user.model';
import { ProjectuserDTO } from '../dtos/projectuser.dto';
import { ActivityprojectModel } from '../models/activityproject.model';
import { ProjectuserModel } from '../models/projectuser.model';
import {
	ActivityprojectConverter,
	ActivityprojectUtilConverter,
} from './activityproject.converter';

export class ProjectuserConverter extends BaseApiConverter<ProjectuserModel, ProjectuserDTO> {
	public convertToModel(dto?: ProjectuserDTO): ProjectuserModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProjectuserModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.role = dto.role;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('project', 'project_fk', new ActivityprojectConverter()),
			new ActivityprojectModel(),
		);
		return model;
	}
	public convertToDto(model?: ProjectuserModel): ProjectuserDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProjectuserDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.role = model.role;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('project', 'project_fk', new ActivityprojectConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ProjectuserModel {
		const model = new ProjectuserModel();
		model.user = UserUtilConverter.toModel();
		model.project = ActivityprojectUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProjectuserDTO {
		const dto = new ProjectuserDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.project_fk = ActivityprojectUtilConverter.toDto();
		return dto;
	}
}

export class ProjectuserUtilConverter {
	static toDto(model?: ProjectuserModel) {
		const converter = new ProjectuserConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ProjectuserDTO) {
		const converter = new ProjectuserConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ProjectuserModel[]) {
		const converter = new ProjectuserConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ProjectuserDTO[]) {
		const converter = new ProjectuserConverter();
		return converter.convertToModelList(dtos);
	}
}
