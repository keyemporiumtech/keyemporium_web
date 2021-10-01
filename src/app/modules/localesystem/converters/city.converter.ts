import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { CityDTO } from '../dtos/city.dto';
import { CityModel } from '../models/city.model';
import { NationConverter, NationUtilConverter } from './nation.converter';
import { NationModel } from '../models/nation.model';

export class CityConverter extends BaseApiConverter<CityModel, CityDTO> {
	public convertToModel(dto?: CityDTO): CityModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new CityModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.countrycod = dto.countrycod;
		model.postalcode = dto.postalcode;
		model.place = dto.place;
		model.region = dto.region;
		model.regioncode = dto.regioncode;
		model.province = dto.province;
		model.provincecode = dto.provincecode;
		model.community = dto.community;
		model.communitycode = dto.communitycode;
		model.geo1 = dto.geo1;
		model.geo2 = dto.geo2;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('nation', 'nation_fk', new NationConverter()),
			new NationModel(),
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
		model.filter_search = dto.filter_search;
		return model;
	}
	public convertToDto(model?: CityModel): CityDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new CityDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.countrycod = model.countrycod;
		dto.postalcode = model.postalcode;
		dto.place = model.place;
		dto.region = model.region;
		dto.regioncode = model.regioncode;
		dto.province = model.province;
		dto.provincecode = model.provincecode;
		dto.community = model.community;
		dto.communitycode = model.communitycode;
		dto.geo1 = model.geo1;
		dto.geo2 = model.geo2;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('nation', 'nation_fk', new NationConverter()),
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
		dto.filter_search = model.filter_search;
		return dto;
	}
	public getEmptyModel(): CityModel {
		const model = new CityModel();
		model.nation = NationUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): CityDTO {
		const dto = new CityDTO();
		dto.nation_fk = NationUtilConverter.toDto();
		return dto;
	}
}

export class CityUtilConverter {
	static toDto(model?: CityModel) {
		const converter = new CityConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: CityDTO) {
		const converter = new CityConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: CityModel[]) {
		const converter = new CityConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: CityDTO[]) {
		const converter = new CityConverter();
		return converter.convertToModelList(dtos);
	}
}
