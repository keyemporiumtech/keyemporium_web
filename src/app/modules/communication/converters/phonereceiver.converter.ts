import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PhonereceiverDTO } from '../dtos/phonereceiver.dto';
import { PhoneModel } from '../models/phone.model';
import { PhonereceiverModel } from '../models/phonereceiver.model';
import { PhoneConverter, PhoneUtilConverter } from './phone.converter';

export class PhonereceiverConverter extends BaseApiConverter<PhonereceiverModel, PhonereceiverDTO> {
	public convertToModel(dto?: PhonereceiverDTO): PhonereceiverModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PhonereceiverModel();
		this.convertCommonPropertiesToModel(dto, model);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('phone', 'phone_fk', new PhoneConverter()),
			new PhoneModel(),
		);
		model.receivername = dto.receivername;
		model.receiverphone = dto.receiverphone;
		this.convertBooleanToModel(dto, model, 'flgreaded');
		model.dtaread = dto.dtaread;
		model.dtareceive = dto.dtareceive;
		return model;
	}
	public convertToDto(model?: PhonereceiverModel): PhonereceiverDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PhonereceiverDTO();
		this.convertCommonPropertiesToDto(dto, model);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('phone', 'phone_fk', new PhoneConverter()),
		);
		dto.receivername = model.receivername;
		dto.receiverphone = model.receiverphone;
		this.convertBooleanToDto(dto, model, 'flgreaded');
		this.convertDateToDto(dto, model, 'dtaread', 'dtareadModel');
		this.convertDateToDto(dto, model, 'dtareceive', 'dtareceiveModel');
		return dto;
	}
	public getEmptyModel(): PhonereceiverModel {
		const model = new PhonereceiverModel();
		model.phone = PhoneUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): PhonereceiverDTO {
		const dto = new PhonereceiverDTO();
		dto.phone_fk = PhoneUtilConverter.toDto();
		return dto;
	}
}

export class PhonereceiverUtilConverter {
	static toDto(model?: PhonereceiverModel) {
		const converter = new PhonereceiverConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: PhonereceiverDTO) {
		const converter = new PhonereceiverConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: PhonereceiverModel[]) {
		const converter = new PhonereceiverConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: PhonereceiverDTO[]) {
		const converter = new PhonereceiverConverter();
		return converter.convertToModelList(dtos);
	}
}
