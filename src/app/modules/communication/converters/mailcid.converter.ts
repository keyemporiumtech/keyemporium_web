import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { MailcidDTO } from '../dtos/mailcid.dto';
import { MailModel } from '../models/mail.model';
import { MailcidModel } from '../models/mailcid.model';
import { MailConverter, MailUtilConverter } from './mail.converter';

export class MailcidConverter extends BaseApiConverter<MailcidModel, MailcidDTO> {
	public convertToModel(dto?: MailcidDTO): MailcidModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new MailcidModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cid = dto.cid;
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
	public convertToDto(model?: MailcidModel): MailcidDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new MailcidDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cid = model.cid;
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
	public getEmptyModel(): MailcidModel {
		const model = new MailcidModel();
		model.mail = MailUtilConverter.toModel();
		model.attachment = AttachmentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): MailcidDTO {
		const dto = new MailcidDTO();
		dto.mail_fk = MailUtilConverter.toDto();
		dto.attachment_fk = AttachmentUtilConverter.toDto();
		return dto;
	}
}

export class MailcidUtilConverter {
	static toDto(model?: MailcidModel) {
		const converter = new MailcidConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: MailcidDTO) {
		const converter = new MailcidConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: MailcidModel[]) {
		const converter = new MailcidConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: MailcidDTO[]) {
		const converter = new MailcidConverter();
		return converter.convertToModelList(dtos);
	}
}
