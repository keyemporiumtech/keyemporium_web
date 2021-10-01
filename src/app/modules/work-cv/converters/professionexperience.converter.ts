import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	WorkexperienceConverter,
	WorkexperienceUtilConverter,
} from '../../work-company/converters/workexperience.converter';
import { WorkexperienceModel } from '../../work-company/models/workexperience.model';
import { ProfessionexperienceDTO } from '../dtos/professionexperience.dto';
import { ProfessionModel } from '../models/profession.model';
import { ProfessionexperienceModel } from '../models/professionexperience.model';
import { ProfessionConverter, ProfessionUtilConverter } from './profession.converter';

export class ProfessionexperienceConverter extends BaseApiConverter<
	ProfessionexperienceModel,
	ProfessionexperienceDTO
> {
	public convertToModel(dto?: ProfessionexperienceDTO): ProfessionexperienceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProfessionexperienceModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('profession', 'profession_fk', new ProfessionConverter()),
			new ProfessionModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('experience', 'experience_fk', new WorkexperienceConverter()),
			new WorkexperienceModel(),
		);
		return model;
	}
	public convertToDto(model?: ProfessionexperienceModel): ProfessionexperienceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProfessionexperienceDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('profession', 'profession_fk', new ProfessionConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('experience', 'experience_fk', new WorkexperienceConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ProfessionexperienceModel {
		const model = new ProfessionexperienceModel();
		model.profession = ProfessionUtilConverter.toModel();
		model.experience = WorkexperienceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProfessionexperienceDTO {
		const dto = new ProfessionexperienceDTO();
		dto.profession_fk = ProfessionUtilConverter.toDto();
		dto.experience_fk = WorkexperienceUtilConverter.toDto();
		return dto;
	}
}

export class ProfessionexperienceUtilConverter {
	static toDto(model?: ProfessionexperienceModel) {
		const converter = new ProfessionexperienceConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ProfessionexperienceDTO) {
		const converter = new ProfessionexperienceConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ProfessionexperienceModel[]) {
		const converter = new ProfessionexperienceConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ProfessionexperienceDTO[]) {
		const converter = new ProfessionexperienceConverter();
		return converter.convertToModelList(dtos);
	}
}
