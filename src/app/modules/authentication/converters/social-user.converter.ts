import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { SocialUserModel } from '../lib/social-user.model';
import { SocialUserDTO } from '../lib/social-user.dto';
import { SocialLoginConverter } from '../lib/social-login.converter';

export class SocialUserConverter extends BaseApiConverter<SocialUserModel, SocialUserDTO> {
	public convertToModel(dto?: SocialUserDTO): SocialUserModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		// this.convertCommonPropertiesToModel(dto, model);
		return SocialLoginConverter.toModel(dto);
	}
	public convertToDto(model?: SocialUserModel): SocialUserDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		return SocialLoginConverter.toDto(model);
	}
	public getEmptyModel(): SocialUserModel {
		const model = new SocialUserModel();
		return model;
	}
	public getEmptyDto(): SocialUserDTO {
		const dto = new SocialUserDTO();
		return dto;
	}
}

export class SocialUserUtilConverter {
	static toDto(model?: SocialUserModel) {
		const converter = new SocialUserConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: SocialUserDTO) {
		const converter = new SocialUserConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: SocialUserModel[]) {
		const converter = new SocialUserConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: SocialUserDTO[]) {
		const converter = new SocialUserConverter();
		return converter.convertToModelList(dtos);
	}
}
