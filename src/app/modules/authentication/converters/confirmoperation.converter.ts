import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ConfirmoperationDTO } from '../dtos/confirmoperation.dto';
import { ConfirmoperationModel } from '../models/confirmoperation.model';
import { UserConverter, UserUtilConverter } from './user.converter';
import { UserModel } from '../models/user.model';

export class ConfirmoperationConverter extends BaseApiConverter<
	ConfirmoperationModel,
	ConfirmoperationDTO
> {
	public convertToModel(dto?: ConfirmoperationDTO): ConfirmoperationModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ConfirmoperationModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.codoperation = dto.codoperation;
		model.description = dto.description;
		model.phone = dto.phone;
		model.codsms = dto.codsms;
		model.email = dto.email;
		model.codemail = dto.codemail;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		model.token = dto.token;
		this.convertBooleanToModel(dto, model, 'flgaccepted');
		this.convertBooleanToModel(dto, model, 'flgclosed');
		return model;
	}
	public convertToDto(model?: ConfirmoperationModel): ConfirmoperationDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ConfirmoperationDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.codoperation = model.codoperation;
		dto.description = model.description;
		dto.phone = model.phone;
		dto.codsms = model.codsms;
		dto.email = model.email;
		dto.codemail = model.codemail;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		dto.token = model.token;
		this.convertBooleanToDto(dto, model, 'flgaccepted');
		this.convertBooleanToDto(dto, model, 'flgclosed');
		return dto;
	}
	public getEmptyModel(): ConfirmoperationModel {
		const model = new ConfirmoperationModel();
		model.user = UserUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ConfirmoperationDTO {
		const dto = new ConfirmoperationDTO();
		dto.user_fk = UserUtilConverter.toDto();
		return dto;
	}
}

export class ConfirmoperationUtilConverter {
	static toDto(model?: ConfirmoperationModel) {
		const converter = new ConfirmoperationConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ConfirmoperationDTO) {
		const converter = new ConfirmoperationConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ConfirmoperationModel[]) {
		const converter = new ConfirmoperationConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ConfirmoperationDTO[]) {
		const converter = new ConfirmoperationConverter();
		return converter.convertToModelList(dtos);
	}
}
