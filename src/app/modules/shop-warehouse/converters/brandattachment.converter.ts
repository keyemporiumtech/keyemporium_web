import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { BrandattachmentModel } from '../models/brandattachment.model';
import { BrandattachmentDTO } from '../dtos/brandattachment.dto';
import { BrandConverter, BrandUtilConverter } from './brand.converter';
import { BrandModel } from '../models/brand.model';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class BrandattachmentConverter extends BaseApiConverter<
	BrandattachmentModel,
	BrandattachmentDTO
> {
	public convertToModel(dto?: BrandattachmentDTO): BrandattachmentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BrandattachmentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('brand', 'brand_fk', new BrandConverter()),
			new BrandModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		return model;
	}
	public convertToDto(model?: BrandattachmentModel): BrandattachmentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BrandattachmentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('brand', 'brand_fk', new BrandConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
		);
		return dto;
	}
	public getEmptyModel(): BrandattachmentModel {
		const model = new BrandattachmentModel();
		model.brand = BrandUtilConverter.toModel();
		model.attachment = AttachmentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BrandattachmentDTO {
		const dto = new BrandattachmentDTO();
		dto.brand_fk = BrandUtilConverter.toDto();
		dto.attachment_fk = AttachmentUtilConverter.toDto();
		return dto;
	}
}

export class BrandattachmentUtilConverter {
	static toDto(model?: BrandattachmentModel) {
		const converter = new BrandattachmentConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BrandattachmentDTO) {
		const converter = new BrandattachmentConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BrandattachmentModel[]) {
		const converter = new BrandattachmentConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BrandattachmentDTO[]) {
		const converter = new BrandattachmentConverter();
		return converter.convertToModelList(dtos);
	}
}
