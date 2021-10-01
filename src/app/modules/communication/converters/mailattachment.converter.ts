import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { MailattachmentDTO } from '../dtos/mailattachment.dto';
import { MailModel } from '../models/mail.model';
import { MailattachmentModel } from '../models/mailattachment.model';
import { MailConverter, MailUtilConverter } from './mail.converter';

export class MailattachmentConverter extends BaseApiConverter<
	MailattachmentModel,
	MailattachmentDTO
> {
	public convertToModel(dto?: MailattachmentDTO): MailattachmentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new MailattachmentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('mail', 'mail_fk', new MailConverter()),
			new MailModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		return model;
	}
	public convertToDto(model?: MailattachmentModel): MailattachmentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new MailattachmentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('mail', 'mail_fk', new MailConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new MailConverter()),
		);
		return dto;
	}
	public getEmptyModel(): MailattachmentModel {
		const model = new MailattachmentModel();
		model.mail = MailUtilConverter.toModel();
		model.attachment = AttachmentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): MailattachmentDTO {
		const dto = new MailattachmentDTO();
		dto.mail_fk = MailUtilConverter.toDto();
		dto.attachment_fk = AttachmentUtilConverter.toDto();
		return dto;
	}
}

export class MailattachmentUtilConverter {
	static toDto(model?: MailattachmentModel) {
		const converter = new MailattachmentConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: MailattachmentDTO) {
		const converter = new MailattachmentConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: MailattachmentModel[]) {
		const converter = new MailattachmentConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: MailattachmentDTO[]) {
		const converter = new MailattachmentConverter();
		return converter.convertToModelList(dtos);
	}
}
