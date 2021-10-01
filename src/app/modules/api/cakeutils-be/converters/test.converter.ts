import { BaseApiConverter } from '../../cakeutils/base/base-api.converter';
import { TestModel } from '../models/test.model';
import { TestDTO } from '../dtos/test.dto';

export class TestConverter extends BaseApiConverter<TestModel, TestDTO> {
	public convertToModel(dto?: TestDTO): TestModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new TestModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.description = dto.description;
		this.convertBooleanToModel(dto, model, 'result');
		return model;
	}
	public convertToDto(model?: TestModel): TestDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new TestDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.description = model.description;
		this.convertBooleanToDto(dto, model, 'result');
		return dto;
	}
	public getEmptyModel(): TestModel {
		const model = new TestModel();
		return model;
	}
	public getEmptyDto(): TestDTO {
		const dto = new TestDTO();
		return dto;
	}
}

export class TestUtilConverter {
	static toDto(model?: TestModel) {
		const converter = new TestConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: TestDTO) {
		const converter = new TestConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: TestModel[]) {
		const converter = new TestConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: TestDTO[]) {
		const converter = new TestConverter();
		return converter.convertToModelList(dtos);
	}
}
