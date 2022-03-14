import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { TicketreservesettingModel } from '../models/ticketreservesetting.model';
import { TicketreservesettingDTO } from '../dtos/ticketreservesetting.dto';
import { TicketConverter, TicketUtilConverter } from './ticket.converter';
import { TicketModel } from '../models/ticket.model';
import {
	ReservationsettingConverter,
	ReservationsettingUtilConverter,
} from './reservationsetting.converter';
import { ReservationsettingModel } from '../models/reservationsetting.model';

export class TicketreservesettingConverter extends BaseApiConverter<
	TicketreservesettingModel,
	TicketreservesettingDTO
> {
	public convertToModel(dto?: TicketreservesettingDTO): TicketreservesettingModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new TicketreservesettingModel();
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
			this.getPropertyForFk('settings', 'settings_fk', new ReservationsettingConverter()),
			new ReservationsettingModel(),
		);
		return model;
	}
	public convertToDto(model?: TicketreservesettingModel): TicketreservesettingDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new TicketreservesettingDTO();
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
			this.getPropertyForFk('settings', 'settings_fk', new ReservationsettingConverter()),
		);
		return dto;
	}
	public getEmptyModel(): TicketreservesettingModel {
		const model = new TicketreservesettingModel();
		model.ticket = TicketUtilConverter.toModel();
		model.settings = ReservationsettingUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): TicketreservesettingDTO {
		const dto = new TicketreservesettingDTO();
		dto.ticket_fk = TicketUtilConverter.toDto();
		dto.settings_fk = ReservationsettingUtilConverter.toDto();
		return dto;
	}
}

export class TicketreservesettingUtilConverter {
	static toDto(model?: TicketreservesettingModel) {
		const converter = new TicketreservesettingConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: TicketreservesettingDTO) {
		const converter = new TicketreservesettingConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: TicketreservesettingModel[]) {
		const converter = new TicketreservesettingConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: TicketreservesettingDTO[]) {
		const converter = new TicketreservesettingConverter();
		return converter.convertToModelList(dtos);
	}
}
