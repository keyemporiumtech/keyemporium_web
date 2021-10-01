import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ActivityreferenceDTO } from '../dtos/activityreference.dto';
import { ActivityreferenceModel } from '../models/activityreference.model';
import { ActivityUtilConverter, ActivityConverter } from './activity.converter';
import { ActivityModel } from '../models/activity.model';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { TypeConverter } from '@ddc/kit';
import { EnumContactreferenceType } from '../enums/contactreference-type.enum';
import {
	ContactreferenceConverter,
	ContactreferenceUtilConverter,
} from './contactreference.converter';
import { ContactreferenceModel } from '../models/contactreference.model';

export class ActivityreferenceConverter extends BaseApiConverter<
	ActivityreferenceModel,
	ActivityreferenceDTO
> {
	private tpcontactreferenceEnumConverter = new TypeConverter<string, EnumContactreferenceType>();

	public convertToModel(dto?: ActivityreferenceDTO): ActivityreferenceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ActivityreferenceModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.group = dto.group;
		this.convertBooleanToModel(dto, model, 'flgprincipal');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk(
				'contactreference',
				'contactreference_fk',
				new ContactreferenceConverter(),
			),
			new ContactreferenceModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk(
				'tpcontactreference',
				'tpcontactreference_fk',
				new TypologicalConverter(),
			),
			new TypologicalModel(),
		);
		// enums
		model.tpcontactreferenceEnum = this.tpcontactreferenceEnumConverter.convertToB(
			dto.tpcontactreference,
		);
		return model;
	}
	public convertToDto(model?: ActivityreferenceModel): ActivityreferenceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ActivityreferenceDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.group = model.group;
		this.convertBooleanToDto(dto, model, 'flgprincipal');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk(
				'contactreference',
				'contactreference_fk',
				new ContactreferenceConverter(),
			),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk(
				'tpcontactreference',
				'tpcontactreference_fk',
				new TypologicalConverter(),
			),
		);
		return dto;
	}
	public getEmptyModel(): ActivityreferenceModel {
		const model = new ActivityreferenceModel();
		model.activity = ActivityUtilConverter.toModel();
		model.contactreference = ContactreferenceUtilConverter.toModel();
		model.tpcontactreference = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ActivityreferenceDTO {
		const dto = new ActivityreferenceDTO();
		dto.activity_fk = ActivityUtilConverter.toDto();
		dto.contactreference_fk = ContactreferenceUtilConverter.toDto();
		dto.tpcontactreference_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class ActivityreferenceUtilConverter {
	static toDto(model?: ActivityreferenceModel) {
		const converter = new ActivityreferenceConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ActivityreferenceDTO) {
		const converter = new ActivityreferenceConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ActivityreferenceModel[]) {
		const converter = new ActivityreferenceConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ActivityreferenceDTO[]) {
		const converter = new ActivityreferenceConverter();
		return converter.convertToModelList(dtos);
	}
}
