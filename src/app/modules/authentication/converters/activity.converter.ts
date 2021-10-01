import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ActivityDTO } from '../dtos/activity.dto';
import { ActivityModel } from '../models/activity.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypeConverter } from '@ddc/kit';
import { EnumActivityType } from '../enums/activity-type.enum';

export class ActivityConverter extends BaseApiConverter<ActivityModel, ActivityDTO> {
	private tpactivityEnumConverter = new TypeConverter<string, EnumActivityType>();

	public convertToModel(dto?: ActivityDTO): ActivityModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ActivityModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.name = dto.name;
		model.namecod = dto.namecod;
		model.description = dto.description;
		model.piva = dto.piva;
		model.born = dto.born;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpactivity', 'tpactivity_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpcat', 'tpcat_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('parent', 'parent_fk', new ActivityConverter(), 'parent_id'),
			new ActivityModel(),
		);
		model.lft = dto.lft;
		model.rght = dto.rght;
		// enums
		model.tpactivityEnum = this.tpactivityEnumConverter.convertToB(dto.tpactivity);
		return model;
	}
	public convertToDto(model?: ActivityModel): ActivityDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ActivityDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.name = model.name;
		dto.namecod = model.namecod;
		dto.description = model.description;
		dto.piva = model.piva;
		this.convertDateToDto(dto, model, 'born', 'bornModel');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpactivity', 'tpactivity_fk', new TypologicalConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpcat', 'tpcat_fk', new TypologicalConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('parent', 'parent_fk', new ActivityConverter(), 'parent_id'),
		);
		dto.lft = model.lft;
		dto.rght = model.rght;
		return dto;
	}
	public getEmptyModel(): ActivityModel {
		const model = new ActivityModel();
		model.tpactivity = TypologicalUtilConverter.toModel();
		model.tpcat = TypologicalUtilConverter.toModel();
		model.parent = ActivityUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ActivityDTO {
		const dto = new ActivityDTO();
		dto.tpactivity_fk = TypologicalUtilConverter.toDto();
		dto.tpcat_fk = TypologicalUtilConverter.toDto();
		dto.parent_fk = ActivityUtilConverter.toDto();
		return dto;
	}
}

export class ActivityUtilConverter {
	static toDto(model?: ActivityModel) {
		const converter = new ActivityConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ActivityDTO) {
		const converter = new ActivityConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ActivityModel[]) {
		const converter = new ActivityConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ActivityDTO[]) {
		const converter = new ActivityConverter();
		return converter.convertToModelList(dtos);
	}
}
