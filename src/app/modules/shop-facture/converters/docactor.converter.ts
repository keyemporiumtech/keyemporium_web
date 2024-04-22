import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	AddressConverter,
	AddressUtilConverter,
} from '../../localesystem/converters/address.converter';
import { CityConverter, CityUtilConverter } from '../../localesystem/converters/city.converter';
import {
	NationConverter,
	NationUtilConverter,
} from '../../localesystem/converters/nation.converter';
import { AddressModel } from '../../localesystem/models/address.model';
import { CityModel } from '../../localesystem/models/city.model';
import { NationModel } from '../../localesystem/models/nation.model';
import { DocactorDTO } from '../dtos/docactor.dto';
import { DocactorModel } from '../models/docactor.model';

export class DocactorConverter extends BaseApiConverter<DocactorModel, DocactorDTO> {
	public convertToModel(dto?: DocactorDTO): DocactorModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new DocactorModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.cf = dto.cf;
		model.addresstext = dto.addresstext;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('address', 'address_fk', new AddressConverter()),
			new AddressModel(),
		);
		model.citytext = dto.citytext;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('city', 'city_fk', new CityConverter()),
			new CityModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('nation', 'nation_fk', new NationConverter()),
			new NationModel(),
		);
		model.zip = dto.zip;
		this.convertBooleanToModel(dto, model, 'flgsender');
		this.convertBooleanToModel(dto, model, 'flgreceiver');
		model.tel = dto.tel;
		model.fax = dto.fax;
		model.email = dto.email;
		// virtualfields
		model.nation_val = dto.nation_val;
		model.nation_cod = dto.nation_cod;
		model.city_val = dto.city_val;
		return model;
	}
	public convertToDto(model?: DocactorModel): DocactorDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new DocactorDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.cf = model.cf;
		dto.addresstext = model.addresstext;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('address', 'address_fk', new AddressConverter()),
		);
		dto.citytext = model.citytext;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('city', 'city_fk', new CityConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('nation', 'nation_fk', new NationConverter()),
		);
		dto.zip = model.zip;
		this.convertBooleanToDto(dto, model, 'flgsender');
		this.convertBooleanToDto(dto, model, 'flgreceiver');
		dto.tel = model.tel;
		dto.fax = model.fax;
		dto.email = model.email;
		// virtualfields
		dto.nation_val = model.nation_val;
		dto.nation_cod = model.nation_cod;
		dto.city_val = model.city_val;
		return dto;
	}
	public getEmptyModel(): DocactorModel {
		const model = new DocactorModel();
		model.address = AddressUtilConverter.toModel();
		model.city = CityUtilConverter.toModel();
		model.nation = NationUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): DocactorDTO {
		const dto = new DocactorDTO();
		dto.address_fk = AddressUtilConverter.toDto();
		dto.city_fk = CityUtilConverter.toDto();
		dto.nation_fk = NationUtilConverter.toDto();
		return dto;
	}
}

export class DocactorUtilConverter {
	static toDto(model?: DocactorModel) {
		const converter = new DocactorConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: DocactorDTO) {
		const converter = new DocactorConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: DocactorModel[]) {
		const converter = new DocactorConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: DocactorDTO[]) {
		const converter = new DocactorConverter();
		return converter.convertToModelList(dtos);
	}
}
