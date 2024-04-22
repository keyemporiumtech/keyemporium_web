import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	CurrencyConverter,
	CurrencyUtilConverter,
} from '../../util-currency/converters/currency.converter';
import { CurrencyModel } from '../../util-currency/models/currency.model';
import { BalancedoctransportDTO } from '../dtos/balancedoctransport.dto';
import { BalancedocModel } from '../models/balancedoc.model';
import { BalancedoctransportModel } from '../models/balancedoctransport.model';
import { BalancedocConverter, BalancedocUtilConverter } from './balancedoc.converter';

export class BalancedoctransportConverter extends BaseApiConverter<
	BalancedoctransportModel,
	BalancedoctransportDTO
> {
	public convertToModel(dto?: BalancedoctransportDTO): BalancedoctransportModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BalancedoctransportModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.company = dto.company;
		model.driver = dto.driver;
		model.packages = dto.packages;
		model.weight = dto.weight;
		model.deposit = dto.deposit;
		model.cost = dto.cost;
		model.packingcost = dto.packingcost;
		model.recessedcost = dto.recessedcost;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('balancedoc', 'balancedoc_fk', new BalancedocConverter()),
			new BalancedocModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
			new CurrencyModel(),
		);
		return model;
	}
	public convertToDto(model?: BalancedoctransportModel): BalancedoctransportDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BalancedoctransportDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.company = model.company;
		dto.driver = model.driver;
		dto.packages = model.packages;
		dto.weight = model.weight;
		dto.deposit = model.deposit;
		dto.cost = model.cost;
		dto.packingcost = model.packingcost;
		dto.recessedcost = model.recessedcost;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('balancedoc', 'balancedoc_fk', new BalancedocConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('currency', 'currency_fk', new CurrencyConverter(), 'currencyid'),
		);
		return dto;
	}
	public getEmptyModel(): BalancedoctransportModel {
		const model = new BalancedoctransportModel();
		model.balancedoc = BalancedocUtilConverter.toModel();
		model.currency = CurrencyUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BalancedoctransportDTO {
		const dto = new BalancedoctransportDTO();
		dto.balancedoc_fk = BalancedocUtilConverter.toDto();
		dto.currency_fk = CurrencyUtilConverter.toDto();
		return dto;
	}
}

export class BalancedoctransportUtilConverter {
	static toDto(model?: BalancedoctransportModel) {
		const converter = new BalancedoctransportConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BalancedoctransportDTO) {
		const converter = new BalancedoctransportConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BalancedoctransportModel[]) {
		const converter = new BalancedoctransportConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BalancedoctransportDTO[]) {
		const converter = new BalancedoctransportConverter();
		return converter.convertToModelList(dtos);
	}
}
