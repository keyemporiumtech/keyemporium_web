import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { GroupDTO } from '../dtos/group.dto';
import { GroupModel } from '../models/group.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { UserModel } from '../models/user.model';
import { UserConverter, UserUtilConverter } from './user.converter';
import { ActivityModel } from '../models/activity.model';
import { ActivityConverter, ActivityUtilConverter } from './activity.converter';

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
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
		);
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
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
		dto.symbol = model.symbol;
		this.convertBooleanToDto(dto, model, 'flgused');
		return dto;
	}
	public getEmptyModel(): GroupModel {
		const model = new GroupModel();
		model.user = UserUtilConverter.toModel();
		model.activity = ActivityUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): GroupDTO {
		const dto = new GroupDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.activity_fk = ActivityUtilConverter.toDto();
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
