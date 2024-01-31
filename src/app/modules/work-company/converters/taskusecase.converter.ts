import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { TaskusecaseDTO } from '../dtos/taskusecase.dto';
import { ProjecttaskModel } from '../models/projecttask.model';
import { TaskusecaseModel } from '../models/taskusecase.model';
import { ProjecttaskConverter, ProjecttaskUtilConverter } from './projecttask.converter';

export class TaskusecaseConverter extends BaseApiConverter<TaskusecaseModel, TaskusecaseDTO> {
	public convertToModel(dto?: TaskusecaseDTO): TaskusecaseModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new TaskusecaseModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('task', 'task_fk', new ProjecttaskConverter()),
			new ProjecttaskModel(),
		);
		return model;
	}
	public convertToDto(model?: TaskusecaseModel): TaskusecaseDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new TaskusecaseDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('task', 'task_fk', new ProjecttaskConverter()),
		);
		return dto;
	}
	public getEmptyModel(): TaskusecaseModel {
		const model = new TaskusecaseModel();
		model.task = ProjecttaskUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): TaskusecaseDTO {
		const dto = new TaskusecaseDTO();
		dto.task_fk = ProjecttaskUtilConverter.toDto();
		return dto;
	}
}

export class TaskusecaseUtilConverter {
	static toDto(model?: TaskusecaseModel) {
		const converter = new TaskusecaseConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: TaskusecaseDTO) {
		const converter = new TaskusecaseConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: TaskusecaseModel[]) {
		const converter = new TaskusecaseConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: TaskusecaseDTO[]) {
		const converter = new TaskusecaseConverter();
		return converter.convertToModelList(dtos);
	}
}
