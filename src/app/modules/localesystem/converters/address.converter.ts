import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { AddressModel } from '../models/address.model';
import { AddressDTO } from '../dtos/address.dto';
import { NationConverter, NationUtilConverter } from './nation.converter';
import { NationModel } from '../models/nation.model';
import { CityConverter, CityUtilConverter } from './city.converter';
import { CityModel } from '../models/city.model';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { TypeConverter } from '@ddc/kit';
import { EnumAddressType } from '../enums/address-type.enum';

export class AddressConverter extends BaseApiConverter<AddressModel, AddressDTO> {
	private tpaddressEnumConverter = new TypeConverter<string, EnumAddressType>();

	convertToModel(dto?: AddressDTO): AddressModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new AddressModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.street = dto.street;
		model.number = dto.number;
		model.zip = dto.zip;
		model.place = dto.city;
		model.province = dto.province;
		model.region = dto.region;
		model.geo1 = dto.geo1;
		model.geo2 = dto.geo2;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('nation', 'nation_fk', new NationConverter()),
			new NationModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('city', 'city_fk', new CityConverter(), 'cityid'),
			new CityModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpaddress', 'tpaddress_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		this.convertForeignValueToModel(
			dto,
			model,
			this.getPropertyForVal('nation', 'nation_val', 'name'),
		);
		this.convertForeignValueToModel(
			dto,
			model,
			this.getPropertyForVal('nation', 'nation_cod', 'cod'),
		);
		this.convertForeignValueToModel(
			dto,
			model,
			this.getPropertyForVal('city', 'city_val', 'place'),
		);
		// enums
		model.tpaddressEnum = this.tpaddressEnumConverter.convertToB(dto.tpaddress);
		return model;
	}
	convertToDto(model?: AddressModel): AddressDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new AddressDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.street = model.street;
		dto.number = model.number;
		dto.zip = model.zip;
		dto.city = model.place;
		dto.province = model.province;
		dto.region = model.region;
		dto.geo1 = model.geo1;
		dto.geo2 = model.geo2;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('nation', 'nation_fk', new NationConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('city', 'city_fk', new CityConverter(), 'cityid'),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpaddress', 'tpaddress_fk', new TypologicalConverter()),
		);
		this.convertForeignValueToDto(
			dto,
			model,
			this.getPropertyForVal('nation', 'nation_val', 'name'),
		);
		this.convertForeignValueToDto(
			dto,
			model,
			this.getPropertyForVal('nation', 'nation_cod', 'cod'),
		);
		this.convertForeignValueToDto(dto, model, this.getPropertyForVal('city', 'city_val', 'place'));
		return dto;
	}

	getEmptyModel(): AddressModel {
		const model = new AddressModel();
		model.nation = NationUtilConverter.toModel();
		model.city = CityUtilConverter.toModel();
		model.tpaddress = TypologicalUtilConverter.toModel();
		return model;
	}

	getEmptyDto(): AddressDTO {
		const dto = new AddressDTO();
		dto.nation_fk = NationUtilConverter.toDto();
		dto.city_fk = CityUtilConverter.toDto();
		dto.tpaddress_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class AddressUtilConverter {
	static toDto(model?: AddressModel) {
		const converter = new AddressConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: AddressDTO) {
		const converter = new AddressConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: AddressModel[]) {
		const converter = new AddressConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: AddressDTO[]) {
		const converter = new AddressConverter();
		return converter.convertToModelList(dtos);
	}
}
