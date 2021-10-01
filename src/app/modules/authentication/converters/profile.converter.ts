import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ProfileDTO } from '../dtos/profile.dto';
import { ProfileModel } from '../models/profile.model';

export class ProfileConverter extends BaseApiConverter<ProfileModel, ProfileDTO> {
	public convertToModel(dto?: ProfileDTO): ProfileModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProfileModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.description = dto.description;
		return model;
	}
	public convertToDto(model?: ProfileModel): ProfileDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProfileDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.description = model.description;
		return dto;
	}
	public getEmptyModel(): ProfileModel {
		const model = new ProfileModel();
		return model;
	}
	public getEmptyDto(): ProfileDTO {
		const dto = new ProfileDTO();
		return dto;
	}
}

export class ProfileUtilConverter {
	static toDto(model?: ProfileModel) {
		const converter = new ProfileConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ProfileDTO) {
		const converter = new ProfileConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ProfileModel[]) {
		const converter = new ProfileConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ProfileDTO[]) {
		const converter = new ProfileConverter();
		return converter.convertToModelList(dtos);
	}
}
