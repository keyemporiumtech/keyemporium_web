import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UseroauthsocialDTO } from '../dtos/useroauthsocial.dto';
import { UseroauthsocialModel } from '../models/useroauthsocial.model';
import { UserUtilConverter, UserConverter } from './user.converter';
import { UserModel } from '../models/user.model';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { TypeConverter } from '@ddc/kit';
import { EnumSocialreferenceType } from '../enums/socialreference-type.enum';

export class UseroauthsocialConverter extends BaseApiConverter<
	UseroauthsocialModel,
	UseroauthsocialDTO
> {
	private tpsocialreferenceEnumConverter = new TypeConverter<string, EnumSocialreferenceType>();

	public convertToModel(dto?: UseroauthsocialDTO): UseroauthsocialModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new UseroauthsocialModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.oauthid = dto.oauthid;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk(
				'tpsocialreference',
				'tpsocialreference_fk',
				new TypologicalConverter(),
			),
			new TypologicalModel(),
		);
		// enums
		model.tpsocialreferenceEnum = this.tpsocialreferenceEnumConverter.convertToB(
			dto.tpsocialreference,
		);
		return model;
	}
	public convertToDto(model?: UseroauthsocialModel): UseroauthsocialDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new UseroauthsocialDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.oauthid = model.oauthid;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk(
				'tpsocialreference',
				'tpsocialreference_fk',
				new TypologicalConverter(),
			),
		);
		return dto;
	}
	public getEmptyModel(): UseroauthsocialModel {
		const model = new UseroauthsocialModel();
		model.user = UserUtilConverter.toModel();
		model.tpsocialreference = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): UseroauthsocialDTO {
		const dto = new UseroauthsocialDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.tpsocialreference_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class UseroauthsocialUtilConverter {
	static toDto(model?: UseroauthsocialModel) {
		const converter = new UseroauthsocialConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: UseroauthsocialDTO) {
		const converter = new UseroauthsocialConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: UseroauthsocialModel[]) {
		const converter = new UseroauthsocialConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: UseroauthsocialDTO[]) {
		const converter = new UseroauthsocialConverter();
		return converter.convertToModelList(dtos);
	}
}
