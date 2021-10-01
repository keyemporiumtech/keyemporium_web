import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { WorkroleDTO } from '../dtos/workrole.dto';
import { WorkroleModel } from '../models/workrole.model';

export class WorkroleConverter extends BaseApiConverter<WorkroleModel, WorkroleDTO> {
	public convertToModel(dto?: WorkroleDTO): WorkroleModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new WorkroleModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.description = dto.description;
		return model;
	}
	public convertToDto(model?: WorkroleModel): WorkroleDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new WorkroleDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.description = model.description;
		return dto;
	}
	public getEmptyModel(): WorkroleModel {
		const model = new WorkroleModel();
		return model;
	}
	public getEmptyDto(): WorkroleDTO {
		const dto = new WorkroleDTO();
		return dto;
	}
}

export class WorkroleUtilConverter {
	static toDto(model?: WorkroleModel) {
		const converter = new WorkroleConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: WorkroleDTO) {
		const converter = new WorkroleConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: WorkroleModel[]) {
		const converter = new WorkroleConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: WorkroleDTO[]) {
		const converter = new WorkroleConverter();
		return converter.convertToModelList(dtos);
	}
}
