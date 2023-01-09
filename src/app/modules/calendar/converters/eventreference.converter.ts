import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { EventreferenceModel } from '../models/eventreference.model';
import { EventreferenceDTO } from '../dtos/eventreference.dto';
import {
	ContactreferenceConverter,
	ContactreferenceUtilConverter,
} from '../../authentication/converters/contactreference.converter';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { EventConverter, EventUtilConverter } from './event.converter';
import { EventModel } from '../models/event.model';
import { TypeConverter } from '../../../kit';
import { EnumContactreferenceType } from '../../authentication/enums/contactreference-type.enum';

export class EventreferenceConverter extends BaseApiConverter<
	EventreferenceModel,
	EventreferenceDTO
> {
	private tpcontactreferenceEnumConverter = new TypeConverter<string, EnumContactreferenceType>();

	public convertToModel(dto?: EventreferenceDTO): EventreferenceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new EventreferenceModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertBooleanToModel(dto, model, 'flgprincipal');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk(
				'contactreference',
				'contactreference_fk',
				new ContactreferenceConverter(),
			),
			new ContactreferenceModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk(
				'tpcontactreference',
				'tpcontactreference_fk',
				new TypologicalConverter(),
			),
			new TypologicalModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('event', 'event_fk', new EventConverter()),
			new EventModel(),
		);
		model.tpcontactreferenceEnum = this.tpcontactreferenceEnumConverter.convertToB(
			dto.tpcontactreference,
		);
		return model;
	}
	public convertToDto(model?: EventreferenceModel): EventreferenceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new EventreferenceDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertBooleanToDto(dto, model, 'flgprincipal');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk(
				'contactreference',
				'contactreference_fk',
				new ContactreferenceConverter(),
			),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk(
				'tpcontactreference',
				'tpcontactreference_fk',
				new TypologicalConverter(),
			),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('event', 'event_fk', new EventConverter()),
		);
		return dto;
	}
	public getEmptyModel(): EventreferenceModel {
		const model = new EventreferenceModel();
		model.contactreference = ContactreferenceUtilConverter.toModel();
		model.tpcontactreference = TypologicalUtilConverter.toModel();
		model.event = EventUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): EventreferenceDTO {
		const dto = new EventreferenceDTO();
		dto.contactreference_fk = ContactreferenceUtilConverter.toDto();
		dto.tpcontactreference_fk = TypologicalUtilConverter.toDto();
		dto.event_fk = EventUtilConverter.toDto();
		return dto;
	}
}

export class EventreferenceUtilConverter {
	static toDto(model?: EventreferenceModel) {
		const converter = new EventreferenceConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: EventreferenceDTO) {
		const converter = new EventreferenceConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: EventreferenceModel[]) {
		const converter = new EventreferenceConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: EventreferenceDTO[]) {
		const converter = new EventreferenceConverter();
		return converter.convertToModelList(dtos);
	}
}
