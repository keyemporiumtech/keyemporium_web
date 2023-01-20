import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ActivityprofileDTO } from '../dtos/activityprofile.dto';
import { ActivityModel } from '../models/activity.model';
import { ActivityprofileModel } from '../models/activityprofile.model';
import { ProfileModel } from '../models/profile.model';
import { ActivityConverter, ActivityUtilConverter } from './activity.converter';
import { ProfileConverter, ProfileUtilConverter } from './profile.converter';

export class ActivityprofileConverter extends BaseApiConverter<
	ActivityprofileModel,
	ActivityprofileDTO
> {
	public convertToModel(dto?: ActivityprofileDTO): ActivityprofileModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ActivityprofileModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('profile', 'profile_fk', new ProfileConverter()),
			new ProfileModel(),
		);

		return model;
	}
	public convertToDto(model?: ActivityprofileModel): ActivityprofileDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ActivityprofileDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('profile', 'profile_fk', new ProfileConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ActivityprofileModel {
		const model = new ActivityprofileModel();
		model.activity = ActivityUtilConverter.toModel();
		model.profile = ProfileUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ActivityprofileDTO {
		const dto = new ActivityprofileDTO();
		dto.activity_fk = ActivityUtilConverter.toDto();
		dto.profile_fk = ProfileUtilConverter.toDto();
		return dto;
	}
}

export class ActivityprofileUtilConverter {
	static toDto(model?: ActivityprofileModel) {
		const converter = new ActivityprofileConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ActivityprofileDTO) {
		const converter = new ActivityprofileConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ActivityprofileModel[]) {
		const converter = new ActivityprofileConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ActivityprofileDTO[]) {
		const converter = new ActivityprofileConverter();
		return converter.convertToModelList(dtos);
	}
}
