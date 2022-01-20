import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PasswordModel } from '../models/password.model';
import { PasswordDTO } from '../dtos/password.dto';

export class PasswordConverter extends BaseApiConverter<PasswordModel, PasswordDTO> {
	public convertToModel(dto?: PasswordDTO): PasswordModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PasswordModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.input = dto.input;
		model.level = dto.level;
		return model;
	}
	public convertToDto(model?: PasswordModel): PasswordDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PasswordDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.input = model.input;
		dto.level = model.level;
		return dto;
	}
	public getEmptyModel(): PasswordModel {
		const model = new PasswordModel();
		return model;
	}
	public getEmptyDto(): PasswordDTO {
		const dto = new PasswordDTO();
		return dto;
	}
}

export class PasswordUtilConverter {
	static toDto(model?: PasswordModel) {
		const converter = new PasswordConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: PasswordDTO) {
		const converter = new PasswordConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: PasswordModel[]) {
		const converter = new PasswordConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: PasswordDTO[]) {
		const converter = new PasswordConverter();
		return converter.convertToModelList(dtos);
	}
}
