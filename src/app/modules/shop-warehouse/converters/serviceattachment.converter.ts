import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ServiceattachmentModel } from '../models/serviceattachment.model';
import { ServiceattachmentDTO } from '../dtos/serviceattachment.dto';
import { ServiceConverter, ServiceUtilConverter } from './service.converter';
import { ServiceModel } from '../models/service.model';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class ServiceattachmentConverter extends BaseApiConverter<
	ServiceattachmentModel,
	ServiceattachmentDTO
> {
	public convertToModel(dto?: ServiceattachmentDTO): ServiceattachmentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ServiceattachmentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('service', 'service_fk', new ServiceConverter()),
			new ServiceModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		return model;
	}
	public convertToDto(model?: ServiceattachmentModel): ServiceattachmentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ServiceattachmentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('service', 'service_fk', new ServiceConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ServiceattachmentModel {
		const model = new ServiceattachmentModel();
		model.service = ServiceUtilConverter.toModel();
		model.attachment = AttachmentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ServiceattachmentDTO {
		const dto = new ServiceattachmentDTO();
		dto.service_fk = ServiceUtilConverter.toDto();
		dto.attachment_fk = AttachmentUtilConverter.toDto();
		return dto;
	}
}

export class ServiceattachmentUtilConverter {
	static toDto(model?: ServiceattachmentModel) {
		const converter = new ServiceattachmentConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ServiceattachmentDTO) {
		const converter = new ServiceattachmentConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ServiceattachmentModel[]) {
		const converter = new ServiceattachmentConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ServiceattachmentDTO[]) {
		const converter = new ServiceattachmentConverter();
		return converter.convertToModelList(dtos);
	}
}
