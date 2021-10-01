import { BaseApiConverter } from '../../cakeutils/base/base-api.converter';
import { TestfkModel } from '../models/testfk.model';
import { TestfkDTO } from '../dtos/testfk.dto';
import { TestConverter } from './test.converter';
import { TestModel } from '../models/test.model';

export class TestfkConverter extends BaseApiConverter<TestfkModel, TestfkDTO> {
	public convertToModel(dto?: TestfkDTO): TestfkModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new TestfkModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.description = dto.description;
		this.convertBooleanToModel(dto, model, 'result');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('test', 'test_fk', new TestConverter()),
			new TestModel(),
		);
		this.convertForeignValueToModel(
			dto,
			model,
			this.getPropertyForVal('test', 'test_title', 'title'),
		);
		return model;
	}
	public convertToDto(model?: TestfkModel): TestfkDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new TestfkDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.description = model.description;
		this.convertBooleanToDto(dto, model, 'result');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('test', 'test_fk', new TestConverter()),
		);
		this.convertForeignValueToDto(
			dto,
			model,
			this.getPropertyForVal('test', 'test_title', 'title'),
		);
		return dto;
	}
	public getEmptyModel(): TestfkModel {
		const model = new TestfkModel();
		return model;
	}
	public getEmptyDto(): TestfkDTO {
		const dto = new TestfkDTO();
		return dto;
	}
}

export class TestfkUtilConverter {
	static toDto(model?: TestfkModel) {
		const converter = new TestfkConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: TestfkDTO) {
		const converter = new TestfkConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: TestfkModel[]) {
		const converter = new TestfkConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: TestfkDTO[]) {
		const converter = new TestfkConverter();
		return converter.convertToModelList(dtos);
	}
}
