import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { CreditcardRequestDTO } from '../dtos/creditcard-request.dto';
import { CreditcardRequestModel } from '../models/creditcard-request.model';

export class CreditcardRequestConverter extends BaseApiConverter<
	CreditcardRequestModel,
	CreditcardRequestDTO
> {
	public convertToModel(dto?: CreditcardRequestDTO): CreditcardRequestModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new CreditcardRequestModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.number = dto.number;
		model.expireMM = dto.expireMM;
		model.expireYY = dto.expireYY;
		model.cvc = dto.cvc;
		model.type = dto.type;
		return model;
	}
	public convertToDto(model?: CreditcardRequestModel): CreditcardRequestDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new CreditcardRequestDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.number = model.number;
		dto.expireMM = model.expireMM;
		dto.expireYY = model.expireYY;
		dto.cvc = model.cvc;
		dto.type = model.type;
		return dto;
	}
	public getEmptyModel(): CreditcardRequestModel {
		const model = new CreditcardRequestModel();
		return model;
	}
	public getEmptyDto(): CreditcardRequestDTO {
		const dto = new CreditcardRequestDTO();
		return dto;
	}
}

export class CreditcardRequestUtilConverter {
	static toDto(model?: CreditcardRequestModel) {
		const converter = new CreditcardRequestConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: CreditcardRequestDTO) {
		const converter = new CreditcardRequestConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: CreditcardRequestModel[]) {
		const converter = new CreditcardRequestConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: CreditcardRequestDTO[]) {
		const converter = new CreditcardRequestConverter();
		return converter.convertToModelList(dtos);
	}
}
