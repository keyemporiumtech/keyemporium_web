import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { CreditcardDTO } from '../dtos/creditcard.dto';
import { CreditcardModel } from '../models/creditcard.model';
import { TypeConverter } from '@ddc/kit';
import { CreditcardRequestUtilConverter } from './creditcard-request.converter';

export class CreditcardConverter extends BaseApiConverter<CreditcardModel, CreditcardDTO> {
	public convertToModel(dto?: CreditcardDTO): CreditcardModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new CreditcardModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.input = CreditcardRequestUtilConverter.toModel(dto.input);
		model.pattern = dto.pattern;
		model.format = dto.format;
		model.length = dto.length;
		model.cvcLength = dto.cvcLength;
		model.luhn = dto.luhn;
		model.type = dto.type;
		return model;
	}
	public convertToDto(model?: CreditcardModel): CreditcardDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new CreditcardDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.input = CreditcardRequestUtilConverter.toDto(model.input);
		dto.pattern = model.pattern;
		dto.format = model.format;
		dto.length = model.length;
		dto.cvcLength = model.cvcLength;
		dto.luhn = model.luhn;
		dto.type = model.type;
		return dto;
	}
	public getEmptyModel(): CreditcardModel {
		const model = new CreditcardModel();
		return model;
	}
	public getEmptyDto(): CreditcardDTO {
		const dto = new CreditcardDTO();
		return dto;
	}
}

export class CreditcardUtilConverter {
	static toDto(model?: CreditcardModel) {
		const converter = new CreditcardConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: CreditcardDTO) {
		const converter = new CreditcardConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: CreditcardModel[]) {
		const converter = new CreditcardConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: CreditcardDTO[]) {
		const converter = new CreditcardConverter();
		return converter.convertToModelList(dtos);
	}
}
