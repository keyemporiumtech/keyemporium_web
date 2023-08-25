import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { Authentication2faDTO } from '../dtos/authentication2fa.dto';
import { Authentication2faModel } from '../models/authentication2fa.model';

export class Authentication2faConverter extends BaseApiConverter<
	Authentication2faModel,
	Authentication2faDTO
> {
	public convertToModel(dto?: Authentication2faDTO): Authentication2faModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new Authentication2faModel();
		// this.convertCommonPropertiesToModel(dto, model);
		model.lastCod = dto.lastCod;
		model.lastTime = dto.lastTime;
		model.key = dto.key;
		model.timeWait = dto.timeWait;
		return model;
	}
	public convertToDto(model?: Authentication2faModel): Authentication2faDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new Authentication2faDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.lastCod = model.lastCod;
		dto.lastTime = model.lastTime;
		dto.key = model.key;
		dto.timeWait = model.timeWait;
		return dto;
	}
	public getEmptyModel(): Authentication2faModel {
		const model = new Authentication2faModel();
		return model;
	}
	public getEmptyDto(): Authentication2faDTO {
		const dto = new Authentication2faDTO();
		return dto;
	}
}

export class Authentication2faUtilConverter {
	static toDto(model?: Authentication2faModel) {
		const converter = new Authentication2faConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: Authentication2faDTO) {
		const converter = new Authentication2faConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: Authentication2faModel[]) {
		const converter = new Authentication2faConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: Authentication2faDTO[]) {
		const converter = new Authentication2faConverter();
		return converter.convertToModelList(dtos);
	}
}
