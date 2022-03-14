import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { TicketdiscountModel } from '../models/ticketdiscount.model';
import { TicketdiscountDTO } from '../dtos/ticketdiscount.dto';
import { TicketConverter, TicketUtilConverter } from './ticket.converter';
import { TicketModel } from '../models/ticket.model';
import { DiscountConverter, DiscountUtilConverter } from './discount.converter';
import { DiscountModel } from '../models/discount.model';

export class TicketdiscountConverter extends BaseApiConverter<
	TicketdiscountModel,
	TicketdiscountDTO
> {
	public convertToModel(dto?: TicketdiscountDTO): TicketdiscountModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new TicketdiscountModel();
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
			this.getPropertyForFk('discount', 'discount_fk', new DiscountConverter()),
			new DiscountModel(),
		);
		return model;
	}
	public convertToDto(model?: TicketdiscountModel): TicketdiscountDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new TicketdiscountDTO();
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
			this.getPropertyForFk('discount', 'discount_fk', new DiscountConverter()),
		);
		return dto;
	}
	public getEmptyModel(): TicketdiscountModel {
		const model = new TicketdiscountModel();
		model.ticket = TicketUtilConverter.toModel();
		model.discount = DiscountUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): TicketdiscountDTO {
		const dto = new TicketdiscountDTO();
		dto.ticket_fk = TicketUtilConverter.toDto();
		dto.discount_fk = DiscountUtilConverter.toDto();
		return dto;
	}
}

export class TicketdiscountUtilConverter {
	static toDto(model?: TicketdiscountModel) {
		const converter = new TicketdiscountConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: TicketdiscountDTO) {
		const converter = new TicketdiscountConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: TicketdiscountModel[]) {
		const converter = new TicketdiscountConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: TicketdiscountDTO[]) {
		const converter = new TicketdiscountConverter();
		return converter.convertToModelList(dtos);
	}
}
