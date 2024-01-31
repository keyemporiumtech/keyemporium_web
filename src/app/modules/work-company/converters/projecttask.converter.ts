import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ProjecttaskDTO } from '../dtos/projecttask.dto';
import { ActivityprojectModel } from '../models/activityproject.model';
import { ProjecttaskModel } from '../models/projecttask.model';
import {
	ActivityprojectConverter,
	ActivityprojectUtilConverter,
} from './activityproject.converter';

export class ProjecttaskConverter extends BaseApiConverter<ProjecttaskModel, ProjecttaskDTO> {
	public convertToModel(dto?: ProjecttaskDTO): ProjecttaskModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProjecttaskModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.dtainit = dto.dtainit;
		model.dtaend = dto.dtaend;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('project', 'project_fk', new ActivityprojectConverter()),
			new ActivityprojectModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('parent', 'parent_fk', new ProjecttaskConverter(), 'parent_id'),
			new ActivityprojectModel(),
		);
		return model;
	}
	public convertToDto(model?: ProjecttaskModel): ProjecttaskDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProjecttaskDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.dtainit = model.dtainit;
		dto.dtaend = model.dtaend;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('project', 'project_fk', new ActivityprojectConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('parent', 'parent_fk', new ProjecttaskConverter(), 'parent_id'),
		);
		return dto;
	}
	public getEmptyModel(): ProjecttaskModel {
		const model = new ProjecttaskModel();
		model.project = ActivityprojectUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProjecttaskDTO {
		const dto = new ProjecttaskDTO();
		dto.project_fk = ActivityprojectUtilConverter.toDto();
		return dto;
	}
}

export class ProjecttaskUtilConverter {
	static toDto(model?: ProjecttaskModel) {
		const converter = new ProjecttaskConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ProjecttaskDTO) {
		const converter = new ProjecttaskConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ProjecttaskModel[]) {
		const converter = new ProjecttaskConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ProjecttaskDTO[]) {
		const converter = new ProjecttaskConverter();
		return converter.convertToModelList(dtos);
	}
}
