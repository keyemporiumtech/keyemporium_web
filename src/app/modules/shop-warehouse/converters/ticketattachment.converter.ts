import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { TicketattachmentModel } from '../models/ticketattachment.model';
import { TicketattachmentDTO } from '../dtos/ticketattachment.dto';
import { TicketConverter, TicketUtilConverter } from './ticket.converter';
import { TicketModel } from '../models/ticket.model';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class TicketattachmentConverter extends BaseApiConverter<
	TicketattachmentModel,
	TicketattachmentDTO
> {
	public convertToModel(dto?: TicketattachmentDTO): TicketattachmentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new TicketattachmentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('ticket', 'ticket_fk', new TicketConverter()),
			new TicketModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		return model;
	}
	public convertToDto(model?: TicketattachmentModel): TicketattachmentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new TicketattachmentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('ticket', 'ticket_fk', new TicketConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
		);
		return dto;
	}
	public getEmptyModel(): TicketattachmentModel {
		const model = new TicketattachmentModel();
		model.ticket = TicketUtilConverter.toModel();
		model.attachment = AttachmentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): TicketattachmentDTO {
		const dto = new TicketattachmentDTO();
		dto.ticket_fk = TicketUtilConverter.toDto();
		dto.attachment_fk = AttachmentUtilConverter.toDto();
		return dto;
	}
}

export class TicketattachmentUtilConverter {
	static toDto(model?: TicketattachmentModel) {
		const converter = new TicketattachmentConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: TicketattachmentDTO) {
		const converter = new TicketattachmentConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: TicketattachmentModel[]) {
		const converter = new TicketattachmentConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: TicketattachmentDTO[]) {
		const converter = new TicketattachmentConverter();
		return converter.convertToModelList(dtos);
	}
}
