import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { GooglerecaptchaVerifyDTO } from '../dtos/googlerecaptcha-verify.dto';
import { GooglerecaptchaVerifyModel } from '../models/googlerecaptcha-verify.model';

export class GooglerecaptchaVerifyConverter extends BaseApiConverter<
	GooglerecaptchaVerifyModel,
	GooglerecaptchaVerifyDTO
> {
	public convertToModel(dto?: GooglerecaptchaVerifyDTO): GooglerecaptchaVerifyModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new GooglerecaptchaVerifyModel();
		// this.convertCommonPropertiesToModel(dto, model);
		model.success = dto.success;
		model.challenge = dto.challenge_ts;
		model.hostname = dto.hostname;
		model.errors = dto.errors;

		return model;
	}
	public convertToDto(model?: GooglerecaptchaVerifyModel): GooglerecaptchaVerifyDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new GooglerecaptchaVerifyDTO();

		dto.success = model.success;
		dto.challenge_ts = model.challenge;
		dto.hostname = model.hostname;
		dto.errors = model.errors;

		return dto;
	}
	public getEmptyModel(): GooglerecaptchaVerifyModel {
		const model = new GooglerecaptchaVerifyModel();
		return model;
	}
	public getEmptyDto(): GooglerecaptchaVerifyDTO {
		const dto = new GooglerecaptchaVerifyDTO();
		return dto;
	}
}

export class GooglerecaptchaVerifUtilConverter {
	static toDto(model?: GooglerecaptchaVerifyModel) {
		const converter = new GooglerecaptchaVerifyConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: GooglerecaptchaVerifyDTO) {
		const converter = new GooglerecaptchaVerifyConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: GooglerecaptchaVerifyModel[]) {
		const converter = new GooglerecaptchaVerifyConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: GooglerecaptchaVerifyDTO[]) {
		const converter = new GooglerecaptchaVerifyConverter();
		return converter.convertToModelList(dtos);
	}
}
