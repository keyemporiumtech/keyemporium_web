import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PhoneDetailDTO } from '../dtos/phone-detail.dto';
import { PhoneDetailModel } from '../models/phone-detail.model';
import { PhoneUtilConverter } from './phone.converter';
import { PhonereceiverUtilConverter } from './phonereceiver.converter';

export class PhoneDetailConverter extends BaseApiConverter<PhoneDetailModel, PhoneDetailDTO> {
	public convertToModel(dto?: PhoneDetailDTO): PhoneDetailModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PhoneDetailModel();

		model.phone = PhoneUtilConverter.toModel(dto.phone);
		model.destinators = PhonereceiverUtilConverter.toModelList(dto.destinators);
		model.body = dto.body;
		model.html = dto.html;
		return model;
	}
	public convertToDto(model?: PhoneDetailModel): PhoneDetailDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PhoneDetailDTO();
		dto.phone = PhoneUtilConverter.toDto(model.phone);
		dto.destinators = PhonereceiverUtilConverter.toDtoList(model.destinators);
		dto.body = model.body;
		dto.html = model.html;
		return dto;
	}
	public getEmptyModel(): PhoneDetailModel {
		const model = new PhoneDetailModel();
		return model;
	}
	public getEmptyDto(): PhoneDetailDTO {
		const dto = new PhoneDetailDTO();
		return dto;
	}
}

export class PhoneDetailUtilConverter {
	static toDto(model?: PhoneDetailModel) {
		const converter = new PhoneDetailConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: PhoneDetailDTO) {
		const converter = new PhoneDetailConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: PhoneDetailModel[]) {
		const converter = new PhoneDetailConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: PhoneDetailDTO[]) {
		const converter = new PhoneDetailConverter();
		return converter.convertToModelList(dtos);
	}
}
