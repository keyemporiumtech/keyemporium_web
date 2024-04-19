import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	PriceConverter,
	PriceUtilConverter,
} from '../../shop-warehouse/converters/price.converter';
import { PriceModel } from '../../shop-warehouse/models/price.model';
import { BalancedocentryDTO } from '../dtos/balancedocentry.dto';
import { BalancedocModel } from '../models/balancedoc.model';
import { BalancedocentryModel } from '../models/balancedocentry.model';
import { BalancedocConverter, BalancedocUtilConverter } from './balancedoc.converter';

export class BalancedocentryConverter extends BaseApiConverter<
	BalancedocentryModel,
	BalancedocentryDTO
> {
	public convertToModel(dto?: BalancedocentryDTO): BalancedocentryModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BalancedocentryModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.description = dto.description;
		model.quantity = dto.quantity;
		model.dtainit = dto.dtainit;
		model.dtaend = dto.dtaend;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('price', 'price_fk', new PriceConverter()),
			new PriceModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('balancedoc', 'balancedoc_fk', new BalancedocConverter()),
			new BalancedocModel(),
		);
		return model;
	}
	public convertToDto(model?: BalancedocentryModel): BalancedocentryDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BalancedocentryDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.description = model.description;
		dto.quantity = model.quantity;
		dto.dtainit = model.dtainit;
		dto.dtaend = model.dtaend;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('price', 'price_fk', new PriceConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('balancedoc', 'balancedoc_fk', new BalancedocConverter()),
		);
		return dto;
	}
	public getEmptyModel(): BalancedocentryModel {
		const model = new BalancedocentryModel();
		model.price = PriceUtilConverter.toModel();
		model.balancedoc = BalancedocUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BalancedocentryDTO {
		const dto = new BalancedocentryDTO();
		dto.price_fk = PriceUtilConverter.toDto();
		dto.balancedoc_fk = BalancedocUtilConverter.toDto();
		return dto;
	}
}

export class BalancedocentryUtilConverter {
	static toDto(model?: BalancedocentryModel) {
		const converter = new BalancedocentryConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BalancedocentryDTO) {
		const converter = new BalancedocentryConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BalancedocentryModel[]) {
		const converter = new BalancedocentryConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BalancedocentryDTO[]) {
		const converter = new BalancedocentryConverter();
		return converter.convertToModelList(dtos);
	}
}
