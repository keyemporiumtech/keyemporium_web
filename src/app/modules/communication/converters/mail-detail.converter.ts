import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { AttachmentUtilConverter } from '../../resources/converters/attachment.converter';
import { MailDetailDTO } from '../dtos/mail-detail.dto';
import { MailDetailModel } from '../models/mail-detail.model';
import { MailUtilConverter } from './mail.converter';
import { MailreceiverUtilConverter } from './mailreceiver.converter';

export class MailDetailConverter extends BaseApiConverter<MailDetailModel, MailDetailDTO> {
	public convertToModel(dto?: MailDetailDTO): MailDetailModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new MailDetailModel();

		model.mail = MailUtilConverter.toModel(dto.mail);
		model.destinators = MailreceiverUtilConverter.toModelList(dto.destinators);
		model.cc = MailreceiverUtilConverter.toModelList(dto.cc);
		model.ccn = MailreceiverUtilConverter.toModelList(dto.ccn);
		model.attachments = AttachmentUtilConverter.toModelList(dto.attachments);
		model.cids = AttachmentUtilConverter.toModelList(dto.cids);
		model.body = dto.body;
		model.html = dto.html;
		return model;
	}
	public convertToDto(model?: MailDetailModel): MailDetailDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new MailDetailDTO();
		dto.mail = MailUtilConverter.toDto(model.mail);
		dto.destinators = MailreceiverUtilConverter.toDtoList(model.destinators);
		dto.cc = MailreceiverUtilConverter.toDtoList(model.cc);
		dto.ccn = MailreceiverUtilConverter.toDtoList(model.ccn);
		dto.attachments = AttachmentUtilConverter.toDtoList(model.attachments);
		dto.cids = AttachmentUtilConverter.toDtoList(model.cids);
		dto.body = model.body;
		dto.html = model.html;
		return dto;
	}
	public getEmptyModel(): MailDetailModel {
		const model = new MailDetailModel();
		return model;
	}
	public getEmptyDto(): MailDetailDTO {
		const dto = new MailDetailDTO();
		return dto;
	}
}

export class MailDetailUtilConverter {
	static toDto(model?: MailDetailModel) {
		const converter = new MailDetailConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: MailDetailDTO) {
		const converter = new MailDetailConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: MailDetailModel[]) {
		const converter = new MailDetailConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: MailDetailDTO[]) {
		const converter = new MailDetailConverter();
		return converter.convertToModelList(dtos);
	}
}
