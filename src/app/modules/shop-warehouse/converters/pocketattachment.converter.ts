import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PocketattachmentModel } from '../models/pocketattachment.model';
import { PocketattachmentDTO } from '../dtos/pocketattachment.dto';
import { PocketConverter, PocketUtilConverter } from './pocket.converter';
import { PocketModel } from '../models/pocket.model';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class PocketattachmentConverter extends BaseApiConverter<
	PocketattachmentModel,
	PocketattachmentDTO
> {
	public convertToModel(dto?: PocketattachmentDTO): PocketattachmentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PocketattachmentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('pocket', 'pocket_fk', new PocketConverter()),
			new PocketModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		return model;
	}
	public convertToDto(model?: PocketattachmentModel): PocketattachmentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PocketattachmentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('pocket', 'pocket_fk', new PocketConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
		);
		return dto;
	}
	public getEmptyModel(): PocketattachmentModel {
		const model = new PocketattachmentModel();
		model.pocket = PocketUtilConverter.toModel();
		model.attachment = AttachmentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): PocketattachmentDTO {
		const dto = new PocketattachmentDTO();
		dto.pocket_fk = PocketUtilConverter.toDto();
		dto.attachment_fk = AttachmentUtilConverter.toDto();
		return dto;
	}
}

export class PocketattachmentUtilConverter {
	static toDto(model?: PocketattachmentModel) {
		const converter = new PocketattachmentConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: PocketattachmentDTO) {
		const converter = new PocketattachmentConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: PocketattachmentModel[]) {
		const converter = new PocketattachmentConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: PocketattachmentDTO[]) {
		const converter = new PocketattachmentConverter();
		return converter.convertToModelList(dtos);
	}
}
