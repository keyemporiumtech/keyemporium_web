import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PhoneDTO } from '../dtos/phone.dto';
import { PhoneModel } from '../models/phone.model';

export class PhoneConverter extends BaseApiConverter<PhoneModel, PhoneDTO> {
	public convertToModel(dto?: PhoneDTO): PhoneModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PhoneModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.sendername = dto.sendername;
		model.senderphone = dto.senderphone;
		model.message = dto.message;
		this.convertBooleanToModel(dto, model, 'flgdeleted');
		model.dtasend = dto.dtasend;
		return model;
	}
	public convertToDto(model?: PhoneModel): PhoneDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PhoneDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.sendername = model.sendername;
		dto.senderphone = model.senderphone;
		dto.message = model.message;
		this.convertBooleanToDto(dto, model, 'flgdeleted');
		this.convertDateToDto(dto, model, 'dtasend', 'dtasendModel');
		return dto;
	}
	public getEmptyModel(): PhoneModel {
		const model = new PhoneModel();
		return model;
	}
	public getEmptyDto(): PhoneDTO {
		const dto = new PhoneDTO();
		return dto;
	}
}

export class PhoneUtilConverter {
	static toDto(model?: PhoneModel) {
		const converter = new PhoneConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: PhoneDTO) {
		const converter = new PhoneConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: PhoneModel[]) {
		const converter = new PhoneConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: PhoneDTO[]) {
		const converter = new PhoneConverter();
		return converter.convertToModelList(dtos);
	}
}
