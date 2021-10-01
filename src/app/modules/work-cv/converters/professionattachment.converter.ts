import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { ProfessionattachmentDTO } from '../dtos/professionattachment.dto';
import { ProfessionModel } from '../models/profession.model';
import { ProfessionattachmentModel } from '../models/professionattachment.model';
import { ProfessionConverter, ProfessionUtilConverter } from './profession.converter';

export class ProfessionattachmentConverter extends BaseApiConverter<
	ProfessionattachmentModel,
	ProfessionattachmentDTO
> {
	public convertToModel(dto?: ProfessionattachmentDTO): ProfessionattachmentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProfessionattachmentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('profession', 'profession_fk', new ProfessionConverter()),
			new ProfessionModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		return model;
	}
	public convertToDto(model?: ProfessionattachmentModel): ProfessionattachmentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProfessionattachmentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('profession', 'profession_fk', new ProfessionConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ProfessionattachmentModel {
		const model = new ProfessionattachmentModel();
		model.profession = ProfessionUtilConverter.toModel();
		model.attachment = AttachmentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProfessionattachmentDTO {
		const dto = new ProfessionattachmentDTO();
		dto.profession_fk = ProfessionUtilConverter.toDto();
		dto.attachment_fk = AttachmentUtilConverter.toDto();
		return dto;
	}
}

export class ProfessionattachmentUtilConverter {
	static toDto(model?: ProfessionattachmentModel) {
		const converter = new ProfessionattachmentConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ProfessionattachmentDTO) {
		const converter = new ProfessionattachmentConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ProfessionattachmentModel[]) {
		const converter = new ProfessionattachmentConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ProfessionattachmentDTO[]) {
		const converter = new ProfessionattachmentConverter();
		return converter.convertToModelList(dtos);
	}
}
