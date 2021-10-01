import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	ContactreferenceConverter,
	ContactreferenceUtilConverter,
} from '../../authentication/converters/contactreference.converter';
import { UserConverter, UserUtilConverter } from '../../authentication/converters/user.converter';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';
import { UserModel } from '../../authentication/models/user.model';
import {
	AddressConverter,
	AddressUtilConverter,
} from '../../localesystem/converters/address.converter';
import { AddressModel } from '../../localesystem/models/address.model';
import {
	AttachmentConverter,
	AttachmentUtilConverter,
} from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { ProfessionDTO } from '../dtos/profession.dto';
import { ProfessionModel } from '../models/profession.model';

export class ProfessionConverter extends BaseApiConverter<ProfessionModel, ProfessionDTO> {
	public convertToModel(dto?: ProfessionDTO): ProfessionModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProfessionModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.name = dto.name;
		model.description = dto.description;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('address', 'address_fk', new AddressConverter()),
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
			this.getPropertyForFk('image', 'image_fk', new AttachmentConverter()),
			new AttachmentModel(),
		);
		return model;
	}
	public convertToDto(model?: ProfessionModel): ProfessionDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProfessionDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.name = model.name;
		dto.description = model.description;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('address', 'address_fk', new AddressConverter()),
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
			this.getPropertyForFk('image', 'image_fk', new AttachmentConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ProfessionModel {
		const model = new ProfessionModel();
		model.user = UserUtilConverter.toModel();
		model.address = AddressUtilConverter.toModel();
		model.email = ContactreferenceUtilConverter.toModel();
		model.phone = ContactreferenceUtilConverter.toModel();
		model.image = AttachmentUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProfessionDTO {
		const dto = new ProfessionDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.address_fk = AddressUtilConverter.toDto();
		dto.email_fk = ContactreferenceUtilConverter.toDto();
		dto.phone_fk = ContactreferenceUtilConverter.toDto();
		dto.image_fk = AttachmentUtilConverter.toDto();
		return dto;
	}
}

export class ProfessionUtilConverter {
	static toDto(model?: ProfessionModel) {
		const converter = new ProfessionConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ProfessionDTO) {
		const converter = new ProfessionConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ProfessionModel[]) {
		const converter = new ProfessionConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ProfessionDTO[]) {
		const converter = new ProfessionConverter();
		return converter.convertToModelList(dtos);
	}
}
