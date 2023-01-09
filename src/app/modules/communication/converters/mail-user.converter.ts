import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { MailUserDTO } from '../dtos/mail-user.dto';
import { MailUserModel } from '../models/mail-user.model';

export class MailUserConverter extends BaseApiConverter<MailUserModel, MailUserDTO> {
	public convertToModel(dto?: MailUserDTO): MailUserModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new MailUserModel();

		model.id_user = dto.id_user;
		model.name = dto.name;
		model.email = dto.email;
		model.nickname = dto.nickname;
		return model;
	}
	public convertToDto(model?: MailUserModel): MailUserDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new MailUserDTO();
		dto.id_user = model.id_user;
		dto.name = model.name;
		dto.email = model.email;
		dto.nickname = model.nickname;
		return dto;
	}
	public getEmptyModel(): MailUserModel {
		const model = new MailUserModel();
		return model;
	}
	public getEmptyDto(): MailUserDTO {
		const dto = new MailUserDTO();
		return dto;
	}
}

export class MailUserUtilConverter {
	static toDto(model?: MailUserModel) {
		const converter = new MailUserConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: MailUserDTO) {
		const converter = new MailUserConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: MailUserModel[]) {
		const converter = new MailUserConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: MailUserDTO[]) {
		const converter = new MailUserConverter();
		return converter.convertToModelList(dtos);
	}
}
