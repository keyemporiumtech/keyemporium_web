import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { NationDTO } from '../dtos/nation.dto';
import { NationModel } from '../models/nation.model';

export class NationConverter extends BaseApiConverter<NationModel, NationDTO> {
	public convertToModel(dto?: NationDTO): NationModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new NationModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.description = dto.description;
		model.capital = dto.capital;
		model.continent = dto.continent;
		model.currencycod = dto.currencycod;
		model.name = dto.name;
		model.tld = dto.tld;
		model.type = dto.type;
		model.cod_iso3166 = dto.cod_iso3166;
		model.geo1 = dto.geo1;
		model.geo2 = dto.geo2;
		model.tel = dto.tel;
		this.convertBooleanToModel(dto, model, 'flgiban');
		this.convertBooleanToModel(dto, model, 'flgused');
		model.priority = dto.priority;
		model.symbol = dto.symbol;
		model.iconimage = dto.iconimage;
		return model;
	}
	public convertToDto(model?: NationModel): NationDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new NationDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.description = model.description;
		dto.capital = model.capital;
		dto.continent = model.continent;
		dto.currencycod = model.currencycod;
		dto.name = model.name;
		dto.tld = model.tld;
		dto.type = model.type;
		dto.cod_iso3166 = model.cod_iso3166;
		dto.geo1 = model.geo1;
		dto.geo2 = model.geo2;
		dto.tel = model.tel;
		this.convertBooleanToModel(dto, model, 'flgiban');
		this.convertBooleanToModel(dto, model, 'flgused');
		dto.priority = model.priority;
		dto.symbol = model.symbol;
		dto.iconimage = model.iconimage;
		return dto;
	}
	public getEmptyModel(): NationModel {
		const model = new NationModel();
		return model;
	}
	public getEmptyDto(): NationDTO {
		const dto = new NationDTO();
		return dto;
	}
}

export class NationUtilConverter {
	static toDto(model?: NationModel) {
		const converter = new NationConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: NationDTO) {
		const converter = new NationConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: NationModel[]) {
		const converter = new NationConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: NationDTO[]) {
		const converter = new NationConverter();
		return converter.convertToModelList(dtos);
	}
}
