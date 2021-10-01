import { TypeConverter } from '@ddc/kit';
import { TypologicalConverter } from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { WorkskillDTO } from '../dtos/workskill.dto';
import { EnumSkillType } from '../enums/skill-type.enum';
import { WorkskillModel } from '../models/workskill.model';

export class WorkskillConverter extends BaseApiConverter<WorkskillModel, WorkskillDTO> {
	private tpskillEnumConverter = new TypeConverter<string, EnumSkillType>();

	public convertToModel(dto?: WorkskillDTO): WorkskillModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new WorkskillModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.description = dto.description;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpskill', 'tpskill_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		model.levelmax = dto.levelmax;
		model.leveldesc = dto.leveldesc;
		// enums
		model.tpskillEnum = this.tpskillEnumConverter.convertToB(dto.tpskill);
		return model;
	}
	public convertToDto(model?: WorkskillModel): WorkskillDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new WorkskillDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.description = model.description;
		return dto;
	}
	public getEmptyModel(): WorkskillModel {
		const model = new WorkskillModel();
		return model;
	}
	public getEmptyDto(): WorkskillDTO {
		const dto = new WorkskillDTO();
		return dto;
	}
}

export class WorkskillUtilConverter {
	static toDto(model?: WorkskillModel) {
		const converter = new WorkskillConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: WorkskillDTO) {
		const converter = new WorkskillConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: WorkskillModel[]) {
		const converter = new WorkskillConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: WorkskillDTO[]) {
		const converter = new WorkskillConverter();
		return converter.convertToModelList(dtos);
	}
}
