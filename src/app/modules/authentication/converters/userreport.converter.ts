import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UserreportDTO } from '../dtos/userreport.dto';
import { UserreportModel } from '../models/userreport.model';
import { UserConverter, UserUtilConverter } from './user.converter';
import { UserModel } from '../models/user.model';

export class UserreportConverter extends BaseApiConverter<UserreportModel, UserreportDTO> {
	public convertToModel(dto?: UserreportDTO): UserreportModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new UserreportModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.codoperation = dto.codoperation;
		model.description = dto.description;
		model.sessionid = dto.sessionid;
		model.ip = dto.ip;
		model.os = dto.os;
		model.browser = dto.browser;
		model.browser_version = dto.browser_version;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		return model;
	}
	public convertToDto(model?: UserreportModel): UserreportDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new UserreportDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.codoperation = model.codoperation;
		dto.description = model.description;
		dto.sessionid = model.sessionid;
		dto.ip = model.ip;
		dto.os = model.os;
		dto.browser = model.browser;
		dto.browser_version = model.browser_version;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		return dto;
	}
	public getEmptyModel(): UserreportModel {
		const model = new UserreportModel();
		model.user = UserUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): UserreportDTO {
		const dto = new UserreportDTO();
		dto.user_fk = UserUtilConverter.toDto();
		return dto;
	}
}

export class UserreportUtilConverter {
	static toDto(model?: UserreportModel) {
		const converter = new UserreportConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: UserreportDTO) {
		const converter = new UserreportConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: UserreportModel[]) {
		const converter = new UserreportConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: UserreportDTO[]) {
		const converter = new UserreportConverter();
		return converter.convertToModelList(dtos);
	}
}
