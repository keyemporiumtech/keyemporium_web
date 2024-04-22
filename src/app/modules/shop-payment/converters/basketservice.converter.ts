import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { BasketserviceModel } from '../models/basketservice.model';
import { BasketserviceDTO } from '../dtos/basketservice.dto';
import {
	ServiceConverter,
	ServiceUtilConverter,
} from '../../shop-warehouse/converters/service.converter';
import { ServiceModel } from '../../shop-warehouse/models/service.model';
import { BasketConverter, BasketUtilConverter } from './basket.converter';
import { BasketModel } from '../models/basket.model';

export class BasketserviceConverter extends BaseApiConverter<BasketserviceModel, BasketserviceDTO> {
	public convertToModel(dto?: BasketserviceDTO): BasketserviceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BasketserviceModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('service', 'service_fk', new ServiceConverter()),
			new ServiceModel(),
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
	public convertToDto(model?: BasketserviceModel): BasketserviceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BasketserviceDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('service', 'service_fk', new ServiceConverter()),
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
	public getEmptyModel(): BasketserviceModel {
		const model = new BasketserviceModel();
		model.service = ServiceUtilConverter.toModel();
		model.basket = BasketUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BasketserviceDTO {
		const dto = new BasketserviceDTO();
		dto.service_fk = ServiceUtilConverter.toDto();
		dto.basket_fk = BasketUtilConverter.toDto();
		return dto;
	}
}

export class BasketserviceUtilConverter {
	static toDto(model?: BasketserviceModel) {
		const converter = new BasketserviceConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BasketserviceDTO) {
		const converter = new BasketserviceConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BasketserviceModel[]) {
		const converter = new BasketserviceConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BasketserviceDTO[]) {
		const converter = new BasketserviceConverter();
		return converter.convertToModelList(dtos);
	}
}
