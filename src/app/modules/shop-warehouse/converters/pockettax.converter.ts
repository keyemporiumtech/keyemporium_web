import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PockettaxModel } from '../models/pockettax.model';
import { PockettaxDTO } from '../dtos/pockettax.dto';
import { PocketConverter, PocketUtilConverter } from './pocket.converter';
import { PocketModel } from '../models/pocket.model';
import {
	CurrencyConverter,
	CurrencyUtilConverter,
} from '../../util-currency/converters/currency.converter';
import { CurrencyModel } from '../../util-currency/models/currency.model';

export class PockettaxConverter extends BaseApiConverter<PockettaxModel, PockettaxDTO> {
	public convertToModel(dto?: PockettaxDTO): PockettaxModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PockettaxModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('pocket', 'pocket_fk', new PocketConverter()),
			new PocketModel(),
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
	public convertToDto(model?: PockettaxModel): PockettaxDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PockettaxDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('pocket', 'pocket_fk', new PocketConverter()),
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
	public getEmptyModel(): PockettaxModel {
		const model = new PockettaxModel();
		model.pocket = PocketUtilConverter.toModel();
		model.currency = CurrencyUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): PockettaxDTO {
		const dto = new PockettaxDTO();
		dto.pocket_fk = PocketUtilConverter.toDto();
		dto.currency_fk = CurrencyUtilConverter.toDto();
		return dto;
	}
}

export class PockettaxUtilConverter {
	static toDto(model?: PockettaxModel) {
		const converter = new PockettaxConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: PockettaxDTO) {
		const converter = new PockettaxConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: PockettaxModel[]) {
		const converter = new PockettaxConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: PockettaxDTO[]) {
		const converter = new PockettaxConverter();
		return converter.convertToModelList(dtos);
	}
}
