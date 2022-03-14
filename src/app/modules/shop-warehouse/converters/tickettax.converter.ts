import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { TickettaxModel } from '../models/tickettax.model';
import { TickettaxDTO } from '../dtos/tickettax.dto';
import { TicketConverter, TicketUtilConverter } from './ticket.converter';
import { TicketModel } from '../models/ticket.model';
import {
	CurrencyConverter,
	CurrencyUtilConverter,
} from '../../util-currency/converters/currency.converter';
import { CurrencyModel } from '../../util-currency/models/currency.model';

export class TickettaxConverter extends BaseApiConverter<TickettaxModel, TickettaxDTO> {
	public convertToModel(dto?: TickettaxDTO): TickettaxModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new TickettaxModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('ticket', 'ticket_fk', new TicketConverter()),
			new TicketModel(),
		);
		model.tax = dto.tax;
		model.tax_percent = dto.tax_percent;
		model.taxdescription = dto.taxdescription;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
			new CurrencyModel(),
		);
		return model;
	}
	public convertToDto(model?: TickettaxModel): TickettaxDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new TickettaxDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('ticket', 'ticket_fk', new TicketConverter()),
		);
		dto.tax = model.tax;
		dto.tax_percent = model.tax_percent;
		dto.taxdescription = model.taxdescription;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
		);
		return dto;
	}
	public getEmptyModel(): TickettaxModel {
		const model = new TickettaxModel();
		model.ticket = TicketUtilConverter.toModel();
		model.currency = CurrencyUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): TickettaxDTO {
		const dto = new TickettaxDTO();
		dto.ticket_fk = TicketUtilConverter.toDto();
		dto.currency_fk = CurrencyUtilConverter.toDto();
		return dto;
	}
}

export class TickettaxUtilConverter {
	static toDto(model?: TickettaxModel) {
		const converter = new TickettaxConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: TickettaxDTO) {
		const converter = new TickettaxConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: TickettaxModel[]) {
		const converter = new TickettaxConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: TickettaxDTO[]) {
		const converter = new TickettaxConverter();
		return converter.convertToModelList(dtos);
	}
}
