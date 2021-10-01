import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { VicDTO } from '../dtos/vic.dto';
import { VicModel } from '../models/vic.model';
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
import { TypeConverter } from '@ddc/kit';
import { EnumSexType } from '../../authentication/enums/sex-type.enum';

export class VicConverter extends BaseApiConverter<VicModel, VicDTO> {
	private sexEnumConverter = new TypeConverter<string, EnumSexType>();

	public convertToModel(dto?: VicDTO): VicModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new VicModel();
		// this.convertCommonPropertiesToModel(dto, model);
		model.id_user = dto.id_user;
		model.name = dto.name;
		model.surname = dto.surname;
		model.born = dto.born;
		model.sex = dto.sex;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('image', 'image', new AttachmentConverter()),
			new AttachmentModel(),
		);
		model.images = AttachmentUtilConverter.toModelList(dto.images);
		model.attachments = AttachmentUtilConverter.toModelList(dto.attachments);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('home', 'home', new AddressConverter()),
			new AddressModel(),
		);
		model.addresses = AddressUtilConverter.toModelList(dto.addresses);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('email', 'email', new ContactreferenceConverter()),
			new ContactreferenceModel(),
		);
		model.emails = ContactreferenceUtilConverter.toModelList(dto.emails);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('phone', 'phone', new ContactreferenceConverter()),
			new ContactreferenceModel(),
		);
		model.phones = ContactreferenceUtilConverter.toModelList(dto.phones);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('link', 'link', new ContactreferenceConverter()),
			new ContactreferenceModel(),
		);
		model.links = ContactreferenceUtilConverter.toModelList(dto.links);
		// enums
		model.sexEnum = this.sexEnumConverter.convertToB(dto.sex);
		return model;
	}
	public convertToDto(model?: VicModel): VicDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new VicDTO();
		// this.convertCommonPropertiesToDto(dto, model);
		dto.id_user = model.id_user;
		dto.name = model.name;
		dto.surname = model.surname;
		dto.born = model.born;
		dto.sex = model.sex ? model.sex : this.sexEnumConverter.convertToA(model.sexEnum);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('image', 'image', new AttachmentConverter()),
		);
		dto.images = AttachmentUtilConverter.toDtoList(model.images);
		dto.attachments = AttachmentUtilConverter.toDtoList(model.attachments);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('home', 'home', new AddressConverter()),
		);
		dto.addresses = AddressUtilConverter.toDtoList(model.addresses);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('email', 'email', new ContactreferenceConverter()),
		);
		dto.emails = ContactreferenceUtilConverter.toDtoList(model.emails);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('phone', 'phone', new ContactreferenceConverter()),
		);
		dto.phones = ContactreferenceUtilConverter.toDtoList(model.phones);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('link', 'link', new ContactreferenceConverter()),
		);
		dto.links = ContactreferenceUtilConverter.toDtoList(model.links);
		return dto;
	}
	public getEmptyModel(): VicModel {
		const model = new VicModel();
		model.image = AttachmentUtilConverter.toModel();
		model.images = AttachmentUtilConverter.toModelList();
		model.attachments = AttachmentUtilConverter.toModelList();
		model.home = AddressUtilConverter.toModel();
		model.addresses = AddressUtilConverter.toModelList();
		model.email = ContactreferenceUtilConverter.toModel();
		model.emails = ContactreferenceUtilConverter.toModelList();
		model.phone = ContactreferenceUtilConverter.toModel();
		model.phones = ContactreferenceUtilConverter.toModelList();
		model.link = ContactreferenceUtilConverter.toModel();
		model.links = ContactreferenceUtilConverter.toModelList();
		return model;
	}
	public getEmptyDto(): VicDTO {
		const dto = new VicDTO();
		dto.image = AttachmentUtilConverter.toDto();
		dto.images = AttachmentUtilConverter.toDtoList();
		dto.attachments = AttachmentUtilConverter.toDtoList();
		dto.home = AddressUtilConverter.toDto();
		dto.addresses = AddressUtilConverter.toDtoList();
		dto.email = ContactreferenceUtilConverter.toDto();
		dto.emails = ContactreferenceUtilConverter.toDtoList();
		dto.phone = ContactreferenceUtilConverter.toDto();
		dto.phones = ContactreferenceUtilConverter.toDtoList();
		dto.link = ContactreferenceUtilConverter.toDto();
		dto.links = ContactreferenceUtilConverter.toDtoList();
		return dto;
	}
}

export class VicUtilConverter {
	static toDto(model?: VicModel) {
		const converter = new VicConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: VicDTO) {
		const converter = new VicConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: VicModel[]) {
		const converter = new VicConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: VicDTO[]) {
		const converter = new VicConverter();
		return converter.convertToModelList(dtos);
	}
}
