import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { BasketticketModel } from '../models/basketticket.model';
import { BasketticketDTO } from '../dtos/basketticket.dto';
import {
	TicketConverter,
	TicketUtilConverter,
} from '../../shop-warehouse/converters/ticket.converter';
import { TicketModel } from '../../shop-warehouse/models/ticket.model';
import { BasketConverter, BasketUtilConverter } from './basket.converter';
import { BasketModel } from '../models/basket.model';

export class BasketticketConverter extends BaseApiConverter<BasketticketModel, BasketticketDTO> {
	public convertToModel(dto?: BasketticketDTO): BasketticketModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BasketticketModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('ticket', 'ticket_fk', new TicketConverter()),
			new TicketModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('basket', 'basket_fk', new BasketConverter()),
			new BasketModel(),
		);
		return model;
	}
	public convertToDto(model?: BasketticketModel): BasketticketDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BasketticketDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('ticket', 'ticket_fk', new TicketConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('basket', 'basket_fk', new BasketConverter()),
		);
		return dto;
	}
	public getEmptyModel(): BasketticketModel {
		const model = new BasketticketModel();
		model.ticket = TicketUtilConverter.toModel();
		model.basket = BasketUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BasketticketDTO {
		const dto = new BasketticketDTO();
		dto.ticket_fk = TicketUtilConverter.toDto();
		dto.basket_fk = BasketUtilConverter.toDto();
		return dto;
	}
}

export class BasketticketUtilConverter {
	static toDto(model?: BasketticketModel) {
		const converter = new BasketticketConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BasketticketDTO) {
		const converter = new BasketticketConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BasketticketModel[]) {
		const converter = new BasketticketConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BasketticketDTO[]) {
		const converter = new BasketticketConverter();
		return converter.convertToModelList(dtos);
	}
}
