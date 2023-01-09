import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { TypeConverter } from '@ddc/kit';
import { EventModel } from '../models/event.model';
import { EventDTO } from '../dtos/event.dto';
import { EnumEventType } from '../enums/event-type.enum';
import { EnumCatType } from '../../authentication/enums/cat-type.enum';

export class EventConverter extends BaseApiConverter<EventModel, EventDTO> {
	private tpeventEnumConverter = new TypeConverter<string, EnumEventType>();
	private tpcatEnumConverter = new TypeConverter<string, EnumCatType>();

	public convertToModel(dto?: EventDTO): EventModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new EventModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.description = dto.description;
		model.dtainit = dto.dtainit;
		model.dtaend = dto.dtaend;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpevent', 'tpevent_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpcat', 'tpcat_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		this.convertBooleanToModel(dto, model, 'flgdeleted');
		// enums
		model.tpeventEnum = this.tpeventEnumConverter.convertToB(dto.tpevent);
		model.tpcatEnum = this.tpcatEnumConverter.convertToB(dto.tpcat);
		return model;
	}
	public convertToDto(model?: EventModel): EventDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new EventDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.description = model.description;
		dto.dtainit = model.dtainit;
		dto.dtaend = model.dtaend;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpevent', 'tpevent_fk', new TypologicalConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpcat', 'tpcat_fk', new TypologicalConverter()),
		);
		this.convertBooleanToDto(dto, model, 'flgdeleted');
		return dto;
	}
	public getEmptyModel(): EventModel {
		const model = new EventModel();
		model.tpevent = TypologicalUtilConverter.toModel();
		model.tpcat = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): EventDTO {
		const dto = new EventDTO();
		dto.tpevent_fk = TypologicalUtilConverter.toDto();
		dto.tpcat_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class EventUtilConverter {
	static toDto(model?: EventModel) {
		const converter = new EventConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: EventDTO) {
		const converter = new EventConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: EventModel[]) {
		const converter = new EventConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: EventDTO[]) {
		const converter = new EventConverter();
		return converter.convertToModelList(dtos);
	}
}
