import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { MailDTO } from '../dtos/mail.dto';
import { MailModel } from '../models/mail.model';

export class MailConverter extends BaseApiConverter<MailModel, MailDTO> {
	public convertToModel(dto?: MailDTO): MailModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new MailModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.ipname = dto.ipname;
		model.subject = dto.subject;
		model.sendername = dto.sendername;
		model.senderemail = dto.senderemail;
		model.message = dto.message;
		this.convertBooleanToModel(dto, model, 'flgdeleted');
		model.dtasend = dto.dtasend;
		return model;
	}
	public convertToDto(model?: MailModel): MailDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new MailDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.ipname = model.ipname;
		dto.subject = model.subject;
		dto.sendername = model.sendername;
		dto.senderemail = model.senderemail;
		dto.message = model.message;
		this.convertBooleanToDto(dto, model, 'flgdeleted');
		this.convertDateToDto(dto, model, 'dtasend', 'dtasendModel');
		return dto;
	}
	public getEmptyModel(): MailModel {
		const model = new MailModel();
		return model;
	}
	public getEmptyDto(): MailDTO {
		const dto = new MailDTO();
		return dto;
	}
}

export class MailUtilConverter {
	static toDto(model?: MailModel) {
		const converter = new MailConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: MailDTO) {
		const converter = new MailConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: MailModel[]) {
		const converter = new MailConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: MailDTO[]) {
		const converter = new MailConverter();
		return converter.convertToModelList(dtos);
	}
}
