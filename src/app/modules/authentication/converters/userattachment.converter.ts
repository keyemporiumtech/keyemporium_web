import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UserattachmentDTO } from '../dtos/userattachment.dto';
import { UserattachmentModel } from '../models/userattachment.model';
import { UserUtilConverter, UserConverter } from './user.converter';
import { UserModel } from '../models/user.model';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { TypeConverter } from '@ddc/kit';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { EnumAttachmentType } from '../../resources/enums/attachment-type.enum';

export class UserattachmentConverter extends BaseApiConverter<
	UserattachmentModel,
	UserattachmentDTO
> {
	private tpattachmentEnumConverter = new TypeConverter<string, EnumAttachmentType>();

	public convertToModel(dto?: UserattachmentDTO): UserattachmentModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new UserattachmentModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.group = dto.group;
		this.convertBooleanToModel(dto, model, 'flgprincipal');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('tpattachment', 'tpattachment_fk', new TypologicalConverter()),
			new TypologicalModel(),
		);
		// enums
		model.tpattachmentEnum = this.tpattachmentEnumConverter.convertToB(dto.tpattachment);
		return model;
	}
	public convertToDto(model?: UserattachmentModel): UserattachmentDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new UserattachmentDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.group = model.group;
		this.convertBooleanToDto(dto, model, 'flgprincipal');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('attachment', 'attachment_fk', new AttachmentConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('tpattachment', 'tpattachment_fk', new TypologicalConverter()),
		);
		return dto;
	}
	public getEmptyModel(): UserattachmentModel {
		const model = new UserattachmentModel();
		model.user = UserUtilConverter.toModel();
		model.attachment = AttachmentUtilConverter.toModel();
		model.tpattachment = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): UserattachmentDTO {
		const dto = new UserattachmentDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.attachment_fk = AttachmentUtilConverter.toDto();
		dto.tpattachment_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class UserattachmentUtilConverter {
	static toDto(model?: UserattachmentModel) {
		const converter = new UserattachmentConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: UserattachmentDTO) {
		const converter = new UserattachmentConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: UserattachmentModel[]) {
		const converter = new UserattachmentConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: UserattachmentDTO[]) {
		const converter = new UserattachmentConverter();
		return converter.convertToModelList(dtos);
	}
}
