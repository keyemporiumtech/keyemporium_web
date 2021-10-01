import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PermissionDTO } from '../dtos/permission.dto';
import { PermissionModel } from '../models/permission.model';

export class PermissionConverter extends BaseApiConverter<PermissionModel, PermissionDTO> {
	public convertToModel(dto?: PermissionDTO): PermissionModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PermissionModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.description = dto.description;
		return model;
	}
	public convertToDto(model?: PermissionModel): PermissionDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PermissionDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.description = model.description;
		return dto;
	}
	public getEmptyModel(): PermissionModel {
		const model = new PermissionModel();
		return model;
	}
	public getEmptyDto(): PermissionDTO {
		const dto = new PermissionDTO();
		return dto;
	}
}

export class PermissionUtilConverter {
	static toDto(model?: PermissionModel) {
		const converter = new PermissionConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: PermissionDTO) {
		const converter = new PermissionConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: PermissionModel[]) {
		const converter = new PermissionConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: PermissionDTO[]) {
		const converter = new PermissionConverter();
		return converter.convertToModelList(dtos);
	}
}
