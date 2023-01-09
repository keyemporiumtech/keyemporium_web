import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { MailConfigDTO } from '../dtos/mail-config.dto';
import { MailConfigModel } from '../models/mail-config.model';

export class MailConfigConverter extends BaseApiConverter<MailConfigModel, MailConfigDTO> {
	public convertToModel(dto?: MailConfigDTO): MailConfigModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new MailConfigModel();

		model.host = dto.host;
		model.port = dto.port;
		model.user = dto.user;
		model.password = dto.password;
		model.passwordCrypted = dto.passwordCrypted;
		return model;
	}
	public convertToDto(model?: MailConfigModel): MailConfigDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new MailConfigDTO();
		dto.host = model.host;
		dto.port = model.port;
		dto.user = model.user;
		dto.password = model.password;
		dto.passwordCrypted = model.passwordCrypted;
		return dto;
	}
	public getEmptyModel(): MailConfigModel {
		const model = new MailConfigModel();
		return model;
	}
	public getEmptyDto(): MailConfigDTO {
		const dto = new MailConfigDTO();
		return dto;
	}
}

export class MailConfigUtilConverter {
	static toDto(model?: MailConfigModel) {
		const converter = new MailConfigConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: MailConfigDTO) {
		const converter = new MailConfigConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: MailConfigModel[]) {
		const converter = new MailConfigConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: MailConfigDTO[]) {
		const converter = new MailConfigConverter();
		return converter.convertToModelList(dtos);
	}
}
