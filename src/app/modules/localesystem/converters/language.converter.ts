import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { LanguageDTO } from '../dtos/language.dto';
import { LanguageModel } from '../models/language.model';

export class LanguageConverter extends BaseApiConverter<LanguageModel, LanguageDTO> {
	public convertToModel(dto?: LanguageDTO): LanguageModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new LanguageModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.symbol = dto.symbol;
		this.convertBooleanToModel(dto, model, 'flgused');
		model.iconimage = dto.iconimage;
		model.country = dto.country;
		model.language = dto.language;
		model.locale = dto.locale;
		model.currencycod = dto.currencycod;
		model.currencysymbol = dto.currencysymbol;
		return model;
	}
	public convertToDto(model?: LanguageModel): LanguageDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new LanguageDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.symbol = model.symbol;
		this.convertBooleanToDto(dto, model, 'flgused');
		dto.iconimage = model.iconimage;
		dto.country = model.country;
		dto.language = model.language;
		dto.locale = model.locale;
		dto.currencycod = model.currencycod;
		dto.currencysymbol = model.currencysymbol;
		return dto;
	}
	public getEmptyModel(): LanguageModel {
		const model = new LanguageModel();
		return model;
	}
	public getEmptyDto(): LanguageDTO {
		const dto = new LanguageDTO();
		return dto;
	}
}

export class LanguageUtilConverter {
	static toDto(model?: LanguageModel) {
		const converter = new LanguageConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: LanguageDTO) {
		const converter = new LanguageConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: LanguageModel[]) {
		const converter = new LanguageConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: LanguageDTO[]) {
		const converter = new LanguageConverter();
		return converter.convertToModelList(dtos);
	}
}
