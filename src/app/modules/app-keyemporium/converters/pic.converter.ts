import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PicDTO } from '../dtos/pic.dto';
import { PicModel } from '../models/pic.model';
import {
	AttachmentUtilConverter,
	AttachmentConverter,
} from '../../resources/converters/attachment.converter';
import {
	AddressUtilConverter,
	AddressConverter,
} from '../../localesystem/converters/address.converter';
import {
	ContactreferenceUtilConverter,
	ContactreferenceConverter,
} from '../../authentication/converters/contactreference.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { AddressModel } from '../../localesystem/models/address.model';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';
import { ProfessionUtilConverter } from '../../work-cv/converters/profession.converter';

export class PicConverter extends BaseApiConverter<PicModel, PicDTO> {
	public convertToModel(dto?: PicDTO): PicModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PicModel();
		// this.convertCommonPropertiesToModel(dto, model);
		model.id_user = dto.id_user;
		model.cf = dto.cf;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('image', 'image', new AttachmentConverter()),
			new AttachmentModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('home', 'home', new AddressConverter()),
			new AddressModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('email', 'email', new ContactreferenceConverter()),
			new ContactreferenceModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('phone', 'phone', new ContactreferenceConverter()),
			new ContactreferenceModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('webiste', 'website', new ContactreferenceConverter()),
			new ContactreferenceModel(),
		);
		model.professions = ProfessionUtilConverter.toModelList(dto.professions);
		return model;
	}
	public convertToDto(model?: PicModel): PicDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PicDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.id_user = model.id_user;
		dto.cf = model.cf;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('image', 'image', new AttachmentConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('home', 'home', new AddressConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('email', 'email', new ContactreferenceConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('phone', 'phone', new ContactreferenceConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('website', 'website', new ContactreferenceConverter()),
		);
		dto.professions = ProfessionUtilConverter.toDtoList(model.professions);
		return dto;
	}
	public getEmptyModel(): PicModel {
		const model = new PicModel();
		model.image = AttachmentUtilConverter.toModel();
		model.home = AddressUtilConverter.toModel();
		model.email = ContactreferenceUtilConverter.toModel();
		model.phone = ContactreferenceUtilConverter.toModel();
		model.website = ContactreferenceUtilConverter.toModel();
		model.professions = ProfessionUtilConverter.toModelList();
		return model;
	}
	public getEmptyDto(): PicDTO {
		const dto = new PicDTO();
		dto.image = AttachmentUtilConverter.toDto();
		dto.home = AddressUtilConverter.toDto();
		dto.email = ContactreferenceUtilConverter.toDto();
		dto.phone = ContactreferenceUtilConverter.toDto();
		dto.website = ContactreferenceUtilConverter.toDto();
		dto.professions = ProfessionUtilConverter.toDtoList();
		return dto;
	}
}

export class PicUtilConverter {
	static toDto(model?: PicModel) {
		const converter = new PicConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: PicDTO) {
		const converter = new PicConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: PicModel[]) {
		const converter = new PicConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: PicDTO[]) {
		const converter = new PicConverter();
		return converter.convertToModelList(dtos);
	}
}
