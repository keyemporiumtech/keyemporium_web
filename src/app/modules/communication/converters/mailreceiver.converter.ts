import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { MailreceiverDTO } from '../dtos/mailreceiver.dto';
import { MailModel } from '../models/mail.model';
import { MailreceiverModel } from '../models/mailreceiver.model';
import { MailConverter, MailUtilConverter } from './mail.converter';

export class MailreceiverConverter extends BaseApiConverter<MailreceiverModel, MailreceiverDTO> {
	public convertToModel(dto?: MailreceiverDTO): MailreceiverModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new MailreceiverModel();
		this.convertCommonPropertiesToModel(dto, model);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('mail', 'mail_fk', new MailConverter()),
			new MailModel(),
		);
		model.receivername = dto.receivername;
		model.receiveremail = dto.receiveremail;
		this.convertBooleanToModel(dto, model, 'flgcc');
		this.convertBooleanToModel(dto, model, 'flgccn');
		this.convertBooleanToModel(dto, model, 'flgreaded');
		model.dtaread = dto.dtaread;
		model.dtareceive = dto.dtareceive;
		return model;
	}
	public convertToDto(model?: MailreceiverModel): MailreceiverDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new MailreceiverDTO();
		this.convertCommonPropertiesToDto(dto, model);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('mail', 'mail_fk', new MailConverter()),
		);
		dto.receivername = model.receivername;
		dto.receiveremail = model.receiveremail;
		this.convertBooleanToDto(dto, model, 'flgcc');
		this.convertBooleanToDto(dto, model, 'flgccn');
		this.convertBooleanToDto(dto, model, 'flgreaded');
		this.convertDateToDto(dto, model, 'dtaread', 'dtareadModel');
		this.convertDateToDto(dto, model, 'dtareceive', 'dtareceiveModel');
		return dto;
	}
	public getEmptyModel(): MailreceiverModel {
		const model = new MailreceiverModel();
		model.mail = MailUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): MailreceiverDTO {
		const dto = new MailreceiverDTO();
		dto.mail_fk = MailUtilConverter.toDto();
		return dto;
	}
}

export class MailreceiverUtilConverter {
	static toDto(model?: MailreceiverModel) {
		const converter = new MailreceiverConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: MailreceiverDTO) {
		const converter = new MailreceiverConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: MailreceiverModel[]) {
		const converter = new MailreceiverConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: MailreceiverDTO[]) {
		const converter = new MailreceiverConverter();
		return converter.convertToModelList(dtos);
	}
}
