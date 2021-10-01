import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { AttachmentDTO } from '../dtos/attachment.dto';
import { AttachmentModel } from '../models/attachment.model';
import { TypeConverter } from '@ddc/kit';
import { EnumAttachmentType } from '../enums/attachment-type.enum';

export class AttachmentConverter extends BaseApiConverter<AttachmentModel, AttachmentDTO> {
	private tpattachmentEnumConverter = new TypeConverter<string, EnumAttachmentType>();

	public convertToModel(dto?: AttachmentDTO): AttachmentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new AttachmentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.url = dto.url;
		model.path = dto.path;
		model.name = dto.name;
		model.cid = dto.cid;
		model.cod = dto.cod;
		model.description = dto.description;
		model.size = dto.size;
		model.ext = dto.ext;
		model.mimetype = dto.mimetype;
		model.type = dto.type;
		this.convertBooleanToModel(dto, model, 'flgpre');
		this.convertBooleanToModel(dto, model, 'flgpost');
		model.prehtml = dto.prehtml;
		model.posthtml = dto.posthtml;
		model.prehtml = dto.prehtml;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpattachment', 'tpattachment_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		model.content = this.convertBase64ToModel(dto.content);
		// enums
		model.tpattachmentEnum = this.tpattachmentEnumConverter.convertToB(dto.tpattachment);
		return model;
	}
	public convertToDto(model?: AttachmentModel): AttachmentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new AttachmentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.url = model.url;
		dto.path = model.path;
		dto.name = model.name;
		dto.cid = model.cid;
		dto.cod = model.cod;
		dto.description = model.description;
		dto.size = model.size;
		dto.ext = model.ext;
		dto.mimetype = model.mimetype;
		dto.type = model.type;
		this.convertBooleanToDto(dto, model, 'flgpre');
		this.convertBooleanToDto(dto, model, 'flgpost');
		dto.prehtml = model.prehtml;
		dto.posthtml = model.posthtml;
		dto.prehtml = model.prehtml;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpattachment', 'tpattachment_fk', new TypologicalConverter()),
		);
		dto.content = this.convertBase64ToModel(model.content);
		return dto;
	}
	public getEmptyModel(): AttachmentModel {
		const model = new AttachmentModel();
		model.tpattachment = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): AttachmentDTO {
		const dto = new AttachmentDTO();
		dto.tpattachment_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class AttachmentUtilConverter {
	static toDto(model?: AttachmentModel) {
		const converter = new AttachmentConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: AttachmentDTO) {
		const converter = new AttachmentConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: AttachmentModel[]) {
		const converter = new AttachmentConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: AttachmentDTO[]) {
		const converter = new AttachmentConverter();
		return converter.convertToModelList(dtos);
	}
}
