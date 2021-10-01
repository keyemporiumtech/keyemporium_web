import { TypologicalModel } from '../models/typological.model';
import { TypologicalDTO } from '../dtos/typological.dto';
import { BaseApiConverter } from '../../cakeutils/base/base-api.converter';

export class TypologicalConverter extends BaseApiConverter<TypologicalModel, TypologicalDTO> {
	convertToModel(dto?: TypologicalDTO): TypologicalModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new TypologicalModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.symbol = dto.symbol;
		this.convertBooleanToModel(dto, model, 'flgused');
		// added
		model.iconimage = dto.iconimage;
		return model;
	}
	convertToDto(model?: TypologicalModel): TypologicalDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new TypologicalDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.symbol = model.symbol;
		this.convertBooleanToDto(dto, model, 'flgused');
		// added
		dto.iconimage = model.iconimage;
		return dto;
	}

	getEmptyModel(): TypologicalModel {
		const model = new TypologicalModel();
		return model;
	}

	getEmptyDto(): TypologicalDTO {
		const dto = new TypologicalDTO();
		return dto;
	}
}

export class TypologicalUtilConverter {
	static toDto(model?: TypologicalModel) {
		const converter = new TypologicalConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: TypologicalDTO) {
		const converter = new TypologicalConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: TypologicalModel[]) {
		const converter = new TypologicalConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: TypologicalDTO[]) {
		const converter = new TypologicalConverter();
		return converter.convertToModelList(dtos);
	}
}
