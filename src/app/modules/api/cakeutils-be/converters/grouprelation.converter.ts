import { BaseApiConverter } from '../../cakeutils/base/base-api.converter';
import { GrouprelationModel } from '../models/grouprelation.model';
import { GrouprelationDTO } from '../dtos/grouprelation.dto';
import { GroupConverter } from './group.converter';
import { GroupModel } from '../models/group.model';

export class GrouprelationConverter extends BaseApiConverter<GrouprelationModel, GrouprelationDTO> {
	public convertToModel(dto?: GrouprelationDTO): GrouprelationModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new GrouprelationModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('group', 'group_fk', new GroupConverter()),
			new GroupModel(),
		);
		model.groupcod = dto.groupcod;
		model.tablename = dto.tablename;
		model.tableid = dto.tableid;
		return model;
	}
	public convertToDto(model?: GrouprelationModel): GrouprelationDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new GrouprelationDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('group', 'group_fk', new GroupConverter()),
		);
		dto.groupcod = model.groupcod;
		dto.tablename = model.tablename;
		dto.tableid = model.tableid;
		return dto;
	}
	public getEmptyModel(): GrouprelationModel {
		const model = new GrouprelationModel();
		return model;
	}
	public getEmptyDto(): GrouprelationDTO {
		const dto = new GrouprelationDTO();
		return dto;
	}
}

export class GrouprelationUtilConverter {
	static toDto(model?: GrouprelationModel) {
		const converter = new GrouprelationConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: GrouprelationDTO) {
		const converter = new GrouprelationConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: GrouprelationModel[]) {
		const converter = new GrouprelationConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: GrouprelationDTO[]) {
		const converter = new GrouprelationConverter();
		return converter.convertToModelList(dtos);
	}
}
