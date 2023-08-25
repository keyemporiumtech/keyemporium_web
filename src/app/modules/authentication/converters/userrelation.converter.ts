import { TypeConverter } from '@ddc/kit';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UserrelationDTO } from '../dtos/userrelation.dto';
import { EnumUserrelationType } from '../enums/userrelation-type.enum';
import { ActivityModel } from '../models/activity.model';
import { UserModel } from '../models/user.model';
import { UserrelationModel } from '../models/userrelation.model';
import { UserConverter, UserUtilConverter } from './user.converter';

export class UserrelationConverter extends BaseApiConverter<UserrelationModel, UserrelationDTO> {
	private tpuserrelationEnumConverter = new TypeConverter<string, EnumUserrelationType>();

	public convertToModel(dto?: UserrelationDTO): UserrelationModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new UserrelationModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user1', 'user1_fk', new UserConverter()),
			new UserModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user2', 'user2_fk', new UserConverter()),
			new ActivityModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tprelation', 'tprelation_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		model.inforelation1 = dto.inforelation1;
		model.inforelation1 = dto.inforelation1;
		// enums
		model.tprelationEnum = this.tpuserrelationEnumConverter.convertToB(dto.tprelation);
		return model;
	}
	public convertToDto(model?: UserrelationModel): UserrelationDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new UserrelationDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user1', 'user1_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user2', 'user2_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tprelation', 'tprelation_fk', new TypologicalConverter()),
		);
		dto.inforelation1 = model.inforelation1;
		dto.inforelation1 = model.inforelation1;
		return dto;
	}
	public getEmptyModel(): UserrelationModel {
		const model = new UserrelationModel();
		model.user1 = UserUtilConverter.toModel();
		model.user2 = UserUtilConverter.toModel();
		model.tprelation = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): UserrelationDTO {
		const dto = new UserrelationDTO();
		dto.user1_fk = UserUtilConverter.toDto();
		dto.user2_fk = UserUtilConverter.toDto();
		dto.tprelation_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class UserrelationUtilConverter {
	static toDto(model?: UserrelationModel) {
		const converter = new UserrelationConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: UserrelationDTO) {
		const converter = new UserrelationConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: UserrelationModel[]) {
		const converter = new UserrelationConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: UserrelationDTO[]) {
		const converter = new UserrelationConverter();
		return converter.convertToModelList(dtos);
	}
}
