import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	PocketConverter,
	PocketUtilConverter,
} from '../../shop-warehouse/converters/pocket.converter';
import { PocketModel } from '../../shop-warehouse/models/pocket.model';
import { BasketpocketDTO } from '../dtos/basketpocket.dto';
import { BasketModel } from '../models/basket.model';
import { BasketpocketModel } from '../models/basketpocket.model';
import { BasketConverter, BasketUtilConverter } from './basket.converter';

export class BasketpocketConverter extends BaseApiConverter<BasketpocketModel, BasketpocketDTO> {
	public convertToModel(dto?: BasketpocketDTO): BasketpocketModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BasketpocketModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('pocket', 'pocket_fk', new PocketConverter()),
			new PocketModel(),
		);
		model.quantity = dto.quantity;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('basket', 'basket_fk', new BasketConverter()),
			new BasketModel(),
		);
		model.dtainit = dto.dtainit;
		model.dtaend = dto.dtaend;
		return model;
	}
	public convertToDto(model?: BasketpocketModel): BasketpocketDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BasketpocketDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('pocket', 'pocket_fk', new PocketConverter()),
		);
		dto.quantity = model.quantity;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('basket', 'basket_fk', new BasketConverter()),
		);
		this.convertDateToDto(dto, model, 'dtainit', 'dtainitModel');
		this.convertDateToDto(dto, model, 'dtaend', 'dtaendModel');
		return dto;
	}
	public getEmptyModel(): BasketpocketModel {
		const model = new BasketpocketModel();
		model.pocket = PocketUtilConverter.toModel();
		model.basket = BasketUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BasketpocketDTO {
		const dto = new BasketpocketDTO();
		dto.pocket_fk = PocketUtilConverter.toDto();
		dto.basket_fk = BasketUtilConverter.toDto();
		return dto;
	}
}

export class BasketpocketUtilConverter {
	static toDto(model?: BasketpocketModel) {
		const converter = new BasketpocketConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BasketpocketDTO) {
		const converter = new BasketpocketConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BasketpocketModel[]) {
		const converter = new BasketpocketConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BasketpocketDTO[]) {
		const converter = new BasketpocketConverter();
		return converter.convertToModelList(dtos);
	}
}
