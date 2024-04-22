import { TypeConverter } from '@ddc/kit';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UserdiagramDTO } from '../dtos/userdiagram.dto';
import { EnumDiagramType } from '../enums/diagram-type.enum';
import { UserModel } from '../models/user.model';
import { UserdiagramModel } from '../models/userdiagram.model';
import { UserConverter, UserUtilConverter } from './user.converter';

export class UserdiagramConverter extends BaseApiConverter<UserdiagramModel, UserdiagramDTO> {
	private tpdiagramEnumConverter = new TypeConverter<string, EnumDiagramType>();

	public convertToModel(dto?: UserdiagramDTO): UserdiagramModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new UserdiagramModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.jsonmodel = dto.jsonmodel;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpdiagram', 'tpdiagram_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		model.tpdiagramEnum = this.tpdiagramEnumConverter.convertToB(dto.tpdiagram);
		return model;
	}
	public convertToDto(model?: UserdiagramModel): UserdiagramDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new UserdiagramDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.jsonmodel = model.jsonmodel;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpdiagram', 'tpdiagram_fk', new TypologicalConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		return dto;
	}
	public getEmptyModel(): UserdiagramModel {
		const model = new UserdiagramModel();
		model.tpdiagram = TypologicalUtilConverter.toModel();
		model.user = UserUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): UserdiagramDTO {
		const dto = new UserdiagramDTO();
		dto.tpdiagram_fk = TypologicalUtilConverter.toDto();
		dto.user_fk = UserUtilConverter.toDto();
		return dto;
	}
}

export class UserdiagramUtilConverter {
	static toDto(model?: UserdiagramModel) {
		const converter = new UserdiagramConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: UserdiagramDTO) {
		const converter = new UserdiagramConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: UserdiagramModel[]) {
		const converter = new UserdiagramConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: UserdiagramDTO[]) {
		const converter = new UserdiagramConverter();
		return converter.convertToModelList(dtos);
	}
}
