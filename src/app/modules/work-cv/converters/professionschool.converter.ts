import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	ActivityConverter,
	ActivityUtilConverter,
} from '../../authentication/converters/activity.converter';
import { ActivityModel } from '../../authentication/models/activity.model';
import { ProfessionschoolDTO } from '../dtos/professionschool.dto';
import { ProfessionModel } from '../models/profession.model';
import { ProfessionschoolModel } from '../models/professionschool.model';
import { ProfessionConverter, ProfessionUtilConverter } from './profession.converter';

export class ProfessionschoolConverter extends BaseApiConverter<
	ProfessionschoolModel,
	ProfessionschoolDTO
> {
	public convertToModel(dto?: ProfessionschoolDTO): ProfessionschoolModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProfessionschoolModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.description = dto.description;
		model.levelval = dto.levelval;
		model.levelmax = dto.levelmax;
		model.leveldesc = dto.leveldesc;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('profession', 'profession_fk', new ProfessionConverter()),
			new ProfessionModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('institute', 'institute_fk', new ActivityConverter()),
			new ActivityModel(),
		);
		model.dtainit = dto.dtainit;
		model.dtaend = dto.dtaend;
		return model;
	}
	public convertToDto(model?: ProfessionschoolModel): ProfessionschoolDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProfessionschoolDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.description = model.description;
		dto.levelval = model.levelval;
		dto.levelmax = model.levelmax;
		dto.leveldesc = model.leveldesc;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('profession', 'profession_fk', new ProfessionConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('institute', 'institute_fk', new ActivityConverter()),
		);
		this.convertDateToDto(dto, model, 'dtainit', 'dtainitModel');
		this.convertDateToDto(dto, model, 'dtaend', 'dtaendModel');
		return dto;
	}
	public getEmptyModel(): ProfessionschoolModel {
		const model = new ProfessionschoolModel();
		model.profession = ProfessionUtilConverter.toModel();
		model.institute = ActivityUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProfessionschoolDTO {
		const dto = new ProfessionschoolDTO();
		dto.profession_fk = ProfessionUtilConverter.toDto();
		dto.institute_fk = ActivityUtilConverter.toDto();
		return dto;
	}
}

export class ProfessionschoolUtilConverter {
	static toDto(model?: ProfessionschoolModel) {
		const converter = new ProfessionschoolConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ProfessionschoolDTO) {
		const converter = new ProfessionschoolConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ProfessionschoolModel[]) {
		const converter = new ProfessionschoolConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ProfessionschoolDTO[]) {
		const converter = new ProfessionschoolConverter();
		return converter.convertToModelList(dtos);
	}
}
