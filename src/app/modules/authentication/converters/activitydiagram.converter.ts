import { TypeConverter } from '@ddc/kit';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ActivitydiagramDTO } from '../dtos/activitydiagram.dto';
import { EnumDiagramType } from '../enums/diagram-type.enum';
import { ActivityModel } from '../models/activity.model';
import { ActivitydiagramModel } from '../models/activitydiagram.model';
import { ActivityConverter, ActivityUtilConverter } from './activity.converter';

export class ActivitydiagramConverter extends BaseApiConverter<
	ActivitydiagramModel,
	ActivitydiagramDTO
> {
	private tpdiagramEnumConverter = new TypeConverter<string, EnumDiagramType>();

	public convertToModel(dto?: ActivitydiagramDTO): ActivitydiagramModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ActivitydiagramModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.jsonmodel = dto.jsonmodel;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpdiagram', 'tpdiagram_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
		);
		model.tpdiagramEnum = this.tpdiagramEnumConverter.convertToB(dto.tpdiagram);
		return model;
	}
	public convertToDto(model?: ActivitydiagramModel): ActivitydiagramDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ActivitydiagramDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.jsonmodel = model.jsonmodel;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpdiagram', 'tpdiagram_fk', new TypologicalConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ActivitydiagramModel {
		const model = new ActivitydiagramModel();
		model.tpdiagram = TypologicalUtilConverter.toModel();
		model.activity = ActivityUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ActivitydiagramDTO {
		const dto = new ActivitydiagramDTO();
		dto.tpdiagram_fk = TypologicalUtilConverter.toDto();
		dto.activity_fk = ActivityUtilConverter.toDto();
		return dto;
	}
}

export class ActivitydiagramUtilConverter {
	static toDto(model?: ActivitydiagramModel) {
		const converter = new ActivitydiagramConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ActivitydiagramDTO) {
		const converter = new ActivitydiagramConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ActivitydiagramModel[]) {
		const converter = new ActivitydiagramConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ActivitydiagramDTO[]) {
		const converter = new ActivitydiagramConverter();
		return converter.convertToModelList(dtos);
	}
}
