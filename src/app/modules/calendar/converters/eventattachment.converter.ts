import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { TypeConverter } from '@ddc/kit';
import { EventattachmentModel } from '../models/eventattachment.model';
import { EventattachmentDTO } from '../dtos/eventattachment.dto';
import { EnumAttachmentType } from '../../resources/enums/attachment-type.enum';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { EventConverter, EventUtilConverter } from './event.converter';
import { EventModel } from '../models/event.model';

export class EventattachmentConverter extends BaseApiConverter<
	EventattachmentModel,
	EventattachmentDTO
> {
	private tpattachmentEnumConverter = new TypeConverter<string, EnumAttachmentType>();

	public convertToModel(dto?: EventattachmentDTO): EventattachmentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new EventattachmentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertBooleanToModel(dto, model, 'flgprincipal');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpattachment', 'tpattachment_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('event', 'event_fk', new EventConverter()),
			new EventModel(),
		);
		// enums
		model.tpattachmentEnum = this.tpattachmentEnumConverter.convertToB(dto.tpattachment);
		return model;
	}
	public convertToDto(model?: EventattachmentModel): EventattachmentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new EventattachmentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertBooleanToDto(dto, model, 'flgprincipal');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpattachment', 'tpattachment_fk', new TypologicalConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('event', 'event_fk', new EventConverter()),
		);

		return dto;
	}
	public getEmptyModel(): EventattachmentModel {
		const model = new EventattachmentModel();
		model.attachment = AttachmentUtilConverter.toModel();
		model.tpattachment = TypologicalUtilConverter.toModel();
		model.event = EventUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): EventattachmentDTO {
		const dto = new EventattachmentDTO();
		dto.attachment_fk = AttachmentUtilConverter.toDto();
		dto.tpattachment_fk = TypologicalUtilConverter.toDto();
		dto.event_fk = EventUtilConverter.toDto();
		return dto;
	}
}

export class EventattachmentUtilConverter {
	static toDto(model?: EventattachmentModel) {
		const converter = new EventattachmentConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: EventattachmentDTO) {
		const converter = new EventattachmentConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: EventattachmentModel[]) {
		const converter = new EventattachmentConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: EventattachmentDTO[]) {
		const converter = new EventattachmentConverter();
		return converter.convertToModelList(dtos);
	}
}
