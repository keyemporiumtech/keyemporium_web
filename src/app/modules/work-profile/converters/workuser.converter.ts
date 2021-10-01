import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { WorkuserDTO } from '../dtos/workuser.dto';
import { WorkuserModel } from '../models/workuser.model';
import { UserUtilConverter, UserConverter } from '../../authentication/converters/user.converter';
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
import { UserModel } from '../../authentication/models/user.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { AddressModel } from '../../localesystem/models/address.model';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';

export class WorkuserConverter extends BaseApiConverter<WorkuserModel, WorkuserDTO> {
	public convertToModel(dto?: WorkuserDTO): WorkuserModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new WorkuserModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('image', 'image_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('home', 'home_fk', new AddressConverter()),
			new AddressModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('email', 'email_fk', new ContactreferenceConverter()),
			new ContactreferenceModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('phone', 'phone_fk', new ContactreferenceConverter()),
			new ContactreferenceModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('website', 'website_fk', new ContactreferenceConverter()),
			new ContactreferenceModel(),
		);
		return model;
	}
	public convertToDto(model?: WorkuserModel): WorkuserDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new WorkuserDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('image', 'image_fk', new AttachmentConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('home', 'home_fk', new AddressConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('email', 'email_fk', new ContactreferenceConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('phone', 'phone_fk', new ContactreferenceConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('website', 'website_fk', new ContactreferenceConverter()),
		);
		return dto;
	}
	public getEmptyModel(): WorkuserModel {
		const model = new WorkuserModel();
		model.user = UserUtilConverter.toModel();
		model.image = AttachmentUtilConverter.toModel();
		model.home = AddressUtilConverter.toModel();
		model.email = ContactreferenceUtilConverter.toModel();
		model.phone = ContactreferenceUtilConverter.toModel();
		model.website = ContactreferenceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): WorkuserDTO {
		const dto = new WorkuserDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.image_fk = AttachmentUtilConverter.toDto();
		dto.home_fk = AddressUtilConverter.toDto();
		dto.email_fk = ContactreferenceUtilConverter.toDto();
		dto.phone_fk = ContactreferenceUtilConverter.toDto();
		dto.website_fk = ContactreferenceUtilConverter.toDto();
		return dto;
	}
}

export class WorkuserUtilConverter {
	static toDto(model?: WorkuserModel) {
		const converter = new WorkuserConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: WorkuserDTO) {
		const converter = new WorkuserConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: WorkuserModel[]) {
		const converter = new WorkuserConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: WorkuserDTO[]) {
		const converter = new WorkuserConverter();
		return converter.convertToModelList(dtos);
	}
}
