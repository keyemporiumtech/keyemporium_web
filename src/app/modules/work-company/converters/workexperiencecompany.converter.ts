import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	ActivityConverter,
	ActivityUtilConverter,
} from '../../authentication/converters/activity.converter';
import { ActivityModel } from '../../authentication/models/activity.model';
import { WorkexperiencecompanyDTO } from '../dtos/workexperiencecompany.dto';
import { WorkexperienceModel } from '../models/workexperience.model';
import { WorkexperiencecompanyModel } from '../models/workexperiencecompany.model';
import { WorkexperienceConverter, WorkexperienceUtilConverter } from './workexperience.converter';

export class WorkexperiencecompanyConverter extends BaseApiConverter<
	WorkexperiencecompanyModel,
	WorkexperiencecompanyDTO
> {
	public convertToModel(dto?: WorkexperiencecompanyDTO): WorkexperiencecompanyModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new WorkexperiencecompanyModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('company', 'company_fk', new ActivityConverter()),
			new ActivityModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('experience', 'experience_fk', new WorkexperienceConverter()),
			new WorkexperienceModel(),
		);

		return model;
	}
	public convertToDto(model?: WorkexperiencecompanyModel): WorkexperiencecompanyDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new WorkexperiencecompanyDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('company', 'company_fk', new ActivityConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('experience', 'experience_fk', new WorkexperienceConverter()),
		);
		return dto;
	}
	public getEmptyModel(): WorkexperiencecompanyModel {
		const model = new WorkexperiencecompanyModel();
		model.company = ActivityUtilConverter.toModel();
		model.experience = WorkexperienceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): WorkexperiencecompanyDTO {
		const dto = new WorkexperiencecompanyDTO();
		dto.company_fk = ActivityUtilConverter.toDto();
		dto.experience_fk = WorkexperienceUtilConverter.toDto();
		return dto;
	}
}

export class WorkexperiencecompanyUtilConverter {
	static toDto(model?: WorkexperiencecompanyModel) {
		const converter = new WorkexperiencecompanyConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: WorkexperiencecompanyDTO) {
		const converter = new WorkexperiencecompanyConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: WorkexperiencecompanyModel[]) {
		const converter = new WorkexperiencecompanyConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: WorkexperiencecompanyDTO[]) {
		const converter = new WorkexperiencecompanyConverter();
		return converter.convertToModelList(dtos);
	}
}
