import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { WorkexperienceskillDTO } from '../dtos/workexperienceskill.dto';
import { WorkexperienceModel } from '../models/workexperience.model';
import { WorkexperienceskillModel } from '../models/workexperienceskill.model';
import { WorkskillModel } from '../models/workskill.model';
import { WorkexperienceConverter, WorkexperienceUtilConverter } from './workexperience.converter';
import { WorkskillConverter, WorkskillUtilConverter } from './workskill.converter';

export class WorkexperienceskillConverter extends BaseApiConverter<
	WorkexperienceskillModel,
	WorkexperienceskillDTO
> {
	public convertToModel(dto?: WorkexperienceskillDTO): WorkexperienceskillModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new WorkexperienceskillModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.gg = dto.gg;
		model.months = dto.months;
		model.levelval = dto.levelval;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('skill', 'skill_fk', new WorkskillConverter()),
			new WorkskillModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('experience', 'experience_fk', new WorkexperienceConverter()),
			new WorkexperienceModel(),
		);

		return model;
	}
	public convertToDto(model?: WorkexperienceskillModel): WorkexperienceskillDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new WorkexperienceskillDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.gg = model.gg;
		dto.months = model.months;
		dto.levelval = model.levelval;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('skill', 'skill_fk', new WorkskillConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('experience', 'experience_fk', new WorkexperienceConverter()),
		);
		return dto;
	}
	public getEmptyModel(): WorkexperienceskillModel {
		const model = new WorkexperienceskillModel();
		model.skill = WorkskillUtilConverter.toModel();
		model.experience = WorkexperienceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): WorkexperienceskillDTO {
		const dto = new WorkexperienceskillDTO();
		dto.skill_fk = WorkskillUtilConverter.toDto();
		dto.experience_fk = WorkexperienceUtilConverter.toDto();
		return dto;
	}
}

export class WorkexperienceskillUtilConverter {
	static toDto(model?: WorkexperienceskillModel) {
		const converter = new WorkexperienceskillConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: WorkexperienceskillDTO) {
		const converter = new WorkexperienceskillConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: WorkexperienceskillModel[]) {
		const converter = new WorkexperienceskillConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: WorkexperienceskillDTO[]) {
		const converter = new WorkexperienceskillConverter();
		return converter.convertToModelList(dtos);
	}
}
