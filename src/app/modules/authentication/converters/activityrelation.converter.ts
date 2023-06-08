import { TypeConverter } from '@ddc/kit';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ActivityrelationDTO } from '../dtos/activityrelation.dto';
import { EnumActivityrelationType } from '../enums/activityrelation-type.enum';
import { ActivityModel } from '../models/activity.model';
import { ActivityrelationModel } from '../models/activityrelation.model';
import { UserModel } from '../models/user.model';
import { ActivityConverter, ActivityUtilConverter } from './activity.converter';
import { UserConverter, UserUtilConverter } from './user.converter';

export class ActivityrelationConverter extends BaseApiConverter<
	ActivityrelationModel,
	ActivityrelationDTO
> {
	private tpuserrelationEnumConverter = new TypeConverter<string, EnumActivityrelationType>();

	public convertToModel(dto?: ActivityrelationDTO): ActivityrelationModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ActivityrelationModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
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
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tprelation', 'tprelation_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		model.inforelationuser = dto.inforelationuser;
		model.inforelationactivity = dto.inforelationactivity;
		// enums
		model.tprelationEnum = this.tpuserrelationEnumConverter.convertToB(dto.tprelation);
		return model;
	}
	public convertToDto(model?: ActivityrelationModel): ActivityrelationDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ActivityrelationDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
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
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tprelation', 'tprelation_fk', new TypologicalConverter()),
		);
		dto.inforelationuser = model.inforelationuser;
		dto.inforelationactivity = model.inforelationactivity;
		return dto;
	}
	public getEmptyModel(): ActivityrelationModel {
		const model = new ActivityrelationModel();
		model.user = UserUtilConverter.toModel();
		model.activity = ActivityUtilConverter.toModel();
		model.tprelation = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ActivityrelationDTO {
		const dto = new ActivityrelationDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.activity_fk = ActivityUtilConverter.toDto();
		dto.tprelation_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class ActivityrelationUtilConverter {
	static toDto(model?: ActivityrelationModel) {
		const converter = new ActivityrelationConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ActivityrelationDTO) {
		const converter = new ActivityrelationConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ActivityrelationModel[]) {
		const converter = new ActivityrelationConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ActivityrelationDTO[]) {
		const converter = new ActivityrelationConverter();
		return converter.convertToModelList(dtos);
	}
}
