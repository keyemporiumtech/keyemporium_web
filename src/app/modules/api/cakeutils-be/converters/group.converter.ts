import { GroupDTO } from '../dtos/group.dto';
import { GroupModel } from '../models/group.model';
import { BaseApiConverter } from '../../cakeutils/base/base-api.converter';

export class GroupConverter extends BaseApiConverter<GroupModel, GroupDTO> {
	public convertToModel(dto?: GroupDTO): GroupModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new GroupModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.description = dto.description;
		model.symbol = dto.symbol;
		this.convertBooleanToModel(dto, model, 'flgused');
		return model;
	}
	public convertToDto(model?: GroupModel): GroupDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new GroupDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.description = model.description;
		dto.symbol = model.symbol;
		this.convertBooleanToDto(dto, model, 'flgused');
		return dto;
	}
	public getEmptyModel(): GroupModel {
		const model = new GroupModel();
		return model;
	}
	public getEmptyDto(): GroupDTO {
		const dto = new GroupDTO();
		return dto;
	}
}

export class GroupUtilConverter {
	static toDto(model?: GroupModel) {
		const converter = new GroupConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: GroupDTO) {
		const converter = new GroupConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: GroupModel[]) {
		const converter = new GroupConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: GroupDTO[]) {
		const converter = new GroupConverter();
		return converter.convertToModelList(dtos);
	}
}
