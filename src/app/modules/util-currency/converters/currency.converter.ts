import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { CurrencyModel } from '../models/currency.model';
import { CurrencyDTO } from '../dtos/currency.dto';

export class CurrencyConverter extends BaseApiConverter<CurrencyModel, CurrencyDTO> {
	public convertToModel(dto?: CurrencyDTO): CurrencyModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new CurrencyModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.symbol = dto.symbol;
		model.iconimage = dto.iconimage;
		this.convertBooleanToModel(dto, model, 'flgused');
		return model;
	}
	public convertToDto(model?: CurrencyModel): CurrencyDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new CurrencyDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.symbol = model.symbol;
		dto.iconimage = model.iconimage;
		this.convertBooleanToDto(dto, model, 'flgused');
		return dto;
	}
	public getEmptyModel(): CurrencyModel {
		const model = new CurrencyModel();
		return model;
	}
	public getEmptyDto(): CurrencyDTO {
		const dto = new CurrencyDTO();
		return dto;
	}
}

export class CurrencyUtilConverter {
	static toDto(model?: CurrencyModel) {
		const converter = new CurrencyConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: CurrencyDTO) {
		const converter = new CurrencyConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: CurrencyModel[]) {
		const converter = new CurrencyConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: CurrencyDTO[]) {
		const converter = new CurrencyConverter();
		return converter.convertToModelList(dtos);
	}
}
