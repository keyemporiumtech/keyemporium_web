import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { MailerDTO } from '../dtos/mailer.dto';
import { MailerModel } from '../models/mailer.model';

export class MailerConverter extends BaseApiConverter<MailerModel, MailerDTO> {
	public convertToModel(dto?: MailerDTO): MailerModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new MailerModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.host = dto.host;
		model.port = dto.port;
		model.username = dto.username;
		model.password = dto.password;
		model.sendername = dto.sendername;
		model.senderemail = dto.senderemail;
		model.crypttype = dto.crypttype;
		return model;
	}
	public convertToDto(model?: MailerModel): MailerDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new MailerDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.host = model.host;
		dto.port = model.port;
		dto.username = model.username;
		dto.password = model.password;
		dto.sendername = model.sendername;
		dto.senderemail = model.senderemail;
		dto.crypttype = model.crypttype;
		return dto;
	}
	public getEmptyModel(): MailerModel {
		const model = new MailerModel();
		return model;
	}
	public getEmptyDto(): MailerDTO {
		const dto = new MailerDTO();
		return dto;
	}
}

export class MailerUtilConverter {
	static toDto(model?: MailerModel) {
		const converter = new MailerConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: MailerDTO) {
		const converter = new MailerConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: MailerModel[]) {
		const converter = new MailerConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: MailerDTO[]) {
		const converter = new MailerConverter();
		return converter.convertToModelList(dtos);
	}
}
