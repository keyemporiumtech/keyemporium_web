import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ApplicationDTO } from '../dtos/application.dto';
import { ActivityModel } from '../models/activity.model';
import { ApplicationModel } from '../models/application.model';
import { UserModel } from '../models/user.model';
import { ActivityConverter, ActivityUtilConverter } from './activity.converter';
import { UserConverter, UserUtilConverter } from './user.converter';

export class ApplicationConverter extends BaseApiConverter<ApplicationModel, ApplicationDTO> {
	public convertToModel(dto?: ApplicationDTO): ApplicationModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ApplicationModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.keytoken = dto.keytoken;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		return model;
	}
	public convertToDto(model?: ApplicationModel): ApplicationDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ApplicationDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.keytoken = model.keytoken;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ApplicationModel {
		const model = new ApplicationModel();
		model.activity = ActivityUtilConverter.toModel();
		model.user = UserUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ApplicationDTO {
		const dto = new ApplicationDTO();
		dto.activity_fk = ActivityUtilConverter.toDto();
		dto.user_fk = UserUtilConverter.toDto();
		return dto;
	}
}

export class ApplicationUtilConverter {
	static toDto(model?: ApplicationModel) {
		const converter = new ApplicationConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ApplicationDTO) {
		const converter = new ApplicationConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ApplicationModel[]) {
		const converter = new ApplicationConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ApplicationDTO[]) {
		const converter = new ApplicationConverter();
		return converter.convertToModelList(dtos);
	}
}
