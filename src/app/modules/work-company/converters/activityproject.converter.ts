import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	ActivityConverter,
	ActivityUtilConverter,
} from '../../authentication/converters/activity.converter';
import { ActivityModel } from '../../authentication/models/activity.model';
import { ActivityprojectDTO } from '../dtos/activityproject.dto';
import { ActivityprojectModel } from '../models/activityproject.model';

export class ActivityprojectConverter extends BaseApiConverter<
	ActivityprojectModel,
	ActivityprojectDTO
> {
	public convertToModel(dto?: ActivityprojectDTO): ActivityprojectModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ActivityprojectModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.dtainit = dto.dtainit;
		model.dtaend = dto.dtaend;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
		);
		return model;
	}
	public convertToDto(model?: ActivityprojectModel): ActivityprojectDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ActivityprojectDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.dtainit = model.dtainit;
		dto.dtaend = model.dtaend;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ActivityprojectModel {
		const model = new ActivityprojectModel();
		model.activity = ActivityUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ActivityprojectDTO {
		const dto = new ActivityprojectDTO();
		dto.activity_fk = ActivityUtilConverter.toDto();
		return dto;
	}
}

export class ActivityprojectUtilConverter {
	static toDto(model?: ActivityprojectModel) {
		const converter = new ActivityprojectConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ActivityprojectDTO) {
		const converter = new ActivityprojectConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ActivityprojectModel[]) {
		const converter = new ActivityprojectConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ActivityprojectDTO[]) {
		const converter = new ActivityprojectConverter();
		return converter.convertToModelList(dtos);
	}
}
