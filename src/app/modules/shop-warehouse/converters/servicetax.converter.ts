import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ServicetaxModel } from '../models/servicetax.model';
import { ServicetaxDTO } from '../dtos/servicetax.dto';
import { ServiceConverter, ServiceUtilConverter } from './service.converter';
import { ServiceModel } from '../models/service.model';
import {
	CurrencyConverter,
	CurrencyUtilConverter,
} from '../../util-currency/converters/currency.converter';
import { CurrencyModel } from '../../util-currency/models/currency.model';

export class ServicetaxConverter extends BaseApiConverter<ServicetaxModel, ServicetaxDTO> {
	public convertToModel(dto?: ServicetaxDTO): ServicetaxModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ServicetaxModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('service', 'service_fk', new ServiceConverter()),
			new ServiceModel(),
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
	public convertToDto(model?: ServicetaxModel): ServicetaxDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ServicetaxDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('service', 'service_fk', new ServiceConverter()),
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
	public getEmptyModel(): ServicetaxModel {
		const model = new ServicetaxModel();
		model.service = ServiceUtilConverter.toModel();
		model.currency = CurrencyUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ServicetaxDTO {
		const dto = new ServicetaxDTO();
		dto.service_fk = ServiceUtilConverter.toDto();
		dto.currency_fk = CurrencyUtilConverter.toDto();
		return dto;
	}
}

export class ServicetaxUtilConverter {
	static toDto(model?: ServicetaxModel) {
		const converter = new ServicetaxConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ServicetaxDTO) {
		const converter = new ServicetaxConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ServicetaxModel[]) {
		const converter = new ServicetaxConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ServicetaxDTO[]) {
		const converter = new ServicetaxConverter();
		return converter.convertToModelList(dtos);
	}
}
