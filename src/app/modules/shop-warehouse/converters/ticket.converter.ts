import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { TicketModel } from '../models/ticket.model';
import { TicketDTO } from '../dtos/ticket.dto';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { EventConverter, EventUtilConverter } from '../../calendar/converters/event.converter';
import { EventModel } from '../../calendar/models/event.model';
import { CategoryConverter, CategoryUtilConverter } from './category.converter';
import { CategoryModel } from '../models/category.model';
import { PriceConverter, PriceUtilConverter } from './price.converter';
import { PriceModel } from '../models/price.model';

export class TicketConverter extends BaseApiConverter<TicketModel, TicketDTO> {
	public convertToModel(dto?: TicketDTO): TicketModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new TicketModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.description = dto.description;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('image', 'image_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		model.quantity = dto.quantity;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('event', 'event_fk', new EventConverter()),
			new EventModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('category', 'category_fk', new CategoryConverter()),
			new CategoryModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('price', 'price_fk', new PriceConverter()),
			new PriceModel(),
		);
		model.note = dto.note;
		model.dtafrom = dto.dtafrom;
		model.dtato = dto.dtato;
		this.convertBooleanToModel(dto, model, 'flgdeleted');
		this.convertBooleanToModel(dto, model, 'flgwarehouse');
		this.convertBooleanToModel(dto, model, 'flgreserve');
		return model;
	}
	public convertToDto(model?: TicketModel): TicketDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new TicketDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.description = model.description;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('image', 'image_fk', new AttachmentConverter()),
		);
		dto.quantity = model.quantity;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('event', 'event_fk', new EventConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('category', 'category_fk', new CategoryConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('price', 'price_fk', new PriceConverter()),
		);
		dto.note = model.note;
		dto.dtafrom = model.dtafrom;
		dto.dtato = model.dtato;
		this.convertBooleanToDto(dto, model, 'flgdeleted');
		this.convertBooleanToDto(dto, model, 'flgwarehouse');
		this.convertBooleanToDto(dto, model, 'flgreserve');
		return dto;
	}
	public getEmptyModel(): TicketModel {
		const model = new TicketModel();
		model.image = AttachmentUtilConverter.toModel();
		model.event = EventUtilConverter.toModel();
		model.category = CategoryUtilConverter.toModel();
		model.price = PriceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): TicketDTO {
		const dto = new TicketDTO();
		dto.image_fk = AttachmentUtilConverter.toDto();
		dto.event_fk = EventUtilConverter.toDto();
		dto.category_fk = CategoryUtilConverter.toDto();
		dto.price_fk = PriceUtilConverter.toDto();
		return dto;
	}
}

export class TicketUtilConverter {
	static toDto(model?: TicketModel) {
		const converter = new TicketConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: TicketDTO) {
		const converter = new TicketConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: TicketModel[]) {
		const converter = new TicketConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: TicketDTO[]) {
		const converter = new TicketConverter();
		return converter.convertToModelList(dtos);
	}
}
