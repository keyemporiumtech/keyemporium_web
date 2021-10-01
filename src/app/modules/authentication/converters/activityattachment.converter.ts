import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ActivityattachmentDTO } from '../dtos/activityattachment.dto';
import { ActivityattachmentModel } from '../models/activityattachment.model';
import { ActivityUtilConverter, ActivityConverter } from './activity.converter';
import { ActivityModel } from '../models/activity.model';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { TypeConverter } from '@ddc/kit';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { EnumAttachmentType } from '../../resources/enums/attachment-type.enum';

export class ActivityattachmentConverter extends BaseApiConverter<
	ActivityattachmentModel,
	ActivityattachmentDTO
> {
	private tpattachmentEnumConverter = new TypeConverter<string, EnumAttachmentType>();

	public convertToModel(dto?: ActivityattachmentDTO): ActivityattachmentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ActivityattachmentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.group = dto.group;
		this.convertBooleanToModel(dto, model, 'flgprincipal');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
		);
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
		// enums
		model.tpattachmentEnum = this.tpattachmentEnumConverter.convertToB(dto.tpattachment);
		return model;
	}
	public convertToDto(model?: ActivityattachmentModel): ActivityattachmentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ActivityattachmentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.group = model.group;
		this.convertBooleanToDto(dto, model, 'flgprincipal');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
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
		return dto;
	}
	public getEmptyModel(): ActivityattachmentModel {
		const model = new ActivityattachmentModel();
		model.activity = ActivityUtilConverter.toModel();
		model.attachment = AttachmentUtilConverter.toModel();
		model.tpattachment = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ActivityattachmentDTO {
		const dto = new ActivityattachmentDTO();
		dto.activity_fk = ActivityUtilConverter.toDto();
		dto.attachment_fk = AttachmentUtilConverter.toDto();
		dto.tpattachment_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class ActivityattachmentUtilConverter {
	static toDto(model?: ActivityattachmentModel) {
		const converter = new ActivityattachmentConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ActivityattachmentDTO) {
		const converter = new ActivityattachmentConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ActivityattachmentModel[]) {
		const converter = new ActivityattachmentConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ActivityattachmentDTO[]) {
		const converter = new ActivityattachmentConverter();
		return converter.convertToModelList(dtos);
	}
}
