import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UserConverter, UserUtilConverter } from '../../authentication/converters/user.converter';
import { UserModel } from '../../authentication/models/user.model';
import { TaskuserDTO } from '../dtos/taskuser.dto';
import { ProjecttaskModel } from '../models/projecttask.model';
import { TaskuserModel } from '../models/taskuser.model';
import { ProjecttaskConverter, ProjecttaskUtilConverter } from './projecttask.converter';

export class TaskuserConverter extends BaseApiConverter<TaskuserModel, TaskuserDTO> {
	public convertToModel(dto?: TaskuserDTO): TaskuserModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new TaskuserModel();
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
			this.getPropertyForFk('task', 'task_fk', new ProjecttaskConverter()),
			new ProjecttaskModel(),
		);
		return model;
	}
	public convertToDto(model?: TaskuserModel): TaskuserDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new TaskuserDTO();
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
			this.getPropertyForFk('task', 'task_fk', new ProjecttaskConverter()),
		);
		return dto;
	}
	public getEmptyModel(): TaskuserModel {
		const model = new TaskuserModel();
		model.user = UserUtilConverter.toModel();
		model.task = ProjecttaskUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): TaskuserDTO {
		const dto = new TaskuserDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.task_fk = ProjecttaskUtilConverter.toDto();
		return dto;
	}
}

export class TaskuserUtilConverter {
	static toDto(model?: TaskuserModel) {
		const converter = new TaskuserConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: TaskuserDTO) {
		const converter = new TaskuserConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: TaskuserModel[]) {
		const converter = new TaskuserConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: TaskuserDTO[]) {
		const converter = new TaskuserConverter();
		return converter.convertToModelList(dtos);
	}
}
