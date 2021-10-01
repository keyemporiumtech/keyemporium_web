import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { MimetypeDTO } from '../dtos/mimetype.dto';
import { MimetypeModel } from '../models/mimetype.model';

export class MimetypeConverter extends BaseApiConverter<MimetypeModel, MimetypeDTO> {
	public convertToModel(dto?: MimetypeDTO): MimetypeModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new MimetypeModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.ext = dto.ext;
		model.value = dto.value;
		model.type = dto.type;
		return model;
	}
	public convertToDto(model?: MimetypeModel): MimetypeDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new MimetypeDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.ext = model.ext;
		dto.value = model.value;
		dto.type = model.type;

		return dto;
	}
	public getEmptyModel(): MimetypeModel {
		const model = new MimetypeModel();
		return model;
	}
	public getEmptyDto(): MimetypeDTO {
		const dto = new MimetypeDTO();
		return dto;
	}
}

export class MimetypeUtilConverter {
	static toDto(model?: MimetypeModel) {
		const converter = new MimetypeConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: MimetypeDTO) {
		const converter = new MimetypeConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: MimetypeModel[]) {
		const converter = new MimetypeConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: MimetypeDTO[]) {
		const converter = new MimetypeConverter();
		return converter.convertToModelList(dtos);
	}
}
