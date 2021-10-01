import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { WorkactivityDTO } from '../dtos/workactivity.dto';
import { WorkactivityModel } from '../models/workactivity.model';
import {
	ActivityUtilConverter,
	ActivityConverter,
} from '../../authentication/converters/activity.converter';
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
import { ActivityModel } from '../../authentication/models/activity.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { AddressModel } from '../../localesystem/models/address.model';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';

export class WorkactivityConverter extends BaseApiConverter<WorkactivityModel, WorkactivityDTO> {
	public convertToModel(dto?: WorkactivityDTO): WorkactivityModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new WorkactivityModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
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
	public convertToDto(model?: WorkactivityModel): WorkactivityDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new WorkactivityDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
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
	public getEmptyModel(): WorkactivityModel {
		const model = new WorkactivityModel();
		model.activity = ActivityUtilConverter.toModel();
		model.image = AttachmentUtilConverter.toModel();
		model.home = AddressUtilConverter.toModel();
		model.email = ContactreferenceUtilConverter.toModel();
		model.phone = ContactreferenceUtilConverter.toModel();
		model.website = ContactreferenceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): WorkactivityDTO {
		const dto = new WorkactivityDTO();
		dto.activity_fk = ActivityUtilConverter.toDto();
		dto.image_fk = AttachmentUtilConverter.toDto();
		dto.home_fk = AddressUtilConverter.toDto();
		dto.email_fk = ContactreferenceUtilConverter.toDto();
		dto.phone_fk = ContactreferenceUtilConverter.toDto();
		dto.website_fk = ContactreferenceUtilConverter.toDto();
		return dto;
	}
}

export class WorkactivityUtilConverter {
	static toDto(model?: WorkactivityModel) {
		const converter = new WorkactivityConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: WorkactivityDTO) {
		const converter = new WorkactivityConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: WorkactivityModel[]) {
		const converter = new WorkactivityConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: WorkactivityDTO[]) {
		const converter = new WorkactivityConverter();
		return converter.convertToModelList(dtos);
	}
}
