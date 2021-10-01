import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	WorkskillConverter,
	WorkskillUtilConverter,
} from '../../work-company/converters/workskill.converter';
import { WorkskillModel } from '../../work-company/models/workskill.model';
import { ProfessionskillDTO } from '../dtos/professionskill.dto';
import { ProfessionModel } from '../models/profession.model';
import { ProfessionskillModel } from '../models/professionskill.model';
import { ProfessionConverter, ProfessionUtilConverter } from './profession.converter';

export class ProfessionskillConverter extends BaseApiConverter<
	ProfessionskillModel,
	ProfessionskillDTO
> {
	public convertToModel(dto?: ProfessionskillDTO): ProfessionskillModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProfessionskillModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.gg = dto.gg;
		model.months = dto.months;
		model.levelval = dto.levelval;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('profession', 'profession_fk', new ProfessionConverter()),
			new ProfessionModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('skill', 'skill_fk', new WorkskillConverter()),
			new WorkskillModel(),
		);
		return model;
	}
	public convertToDto(model?: ProfessionskillModel): ProfessionskillDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProfessionskillDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.gg = model.gg;
		dto.months = model.months;
		dto.levelval = model.levelval;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('profession', 'profession_fk', new ProfessionConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('skill', 'skill_fk', new WorkskillConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ProfessionskillModel {
		const model = new ProfessionskillModel();
		model.profession = ProfessionUtilConverter.toModel();
		model.skill = WorkskillUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProfessionskillDTO {
		const dto = new ProfessionskillDTO();
		dto.profession_fk = ProfessionUtilConverter.toDto();
		dto.skill_fk = WorkskillUtilConverter.toDto();
		return dto;
	}
}

export class ProfessionskillUtilConverter {
	static toDto(model?: ProfessionskillModel) {
		const converter = new ProfessionskillConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ProfessionskillDTO) {
		const converter = new ProfessionskillConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ProfessionskillModel[]) {
		const converter = new ProfessionskillConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ProfessionskillDTO[]) {
		const converter = new ProfessionskillConverter();
		return converter.convertToModelList(dtos);
	}
}
