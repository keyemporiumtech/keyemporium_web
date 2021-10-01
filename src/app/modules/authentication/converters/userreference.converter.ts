import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UserreferenceDTO } from '../dtos/userreference.dto';
import { UserreferenceModel } from '../models/userreference.model';
import { UserUtilConverter, UserConverter } from './user.converter';
import { UserModel } from '../models/user.model';
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

export class UserreferenceConverter extends BaseApiConverter<UserreferenceModel, UserreferenceDTO> {
	private tpcontactreferenceEnumConverter = new TypeConverter<string, EnumContactreferenceType>();

	public convertToModel(dto?: UserreferenceDTO): UserreferenceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new UserreferenceModel();
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
	public convertToDto(model?: UserreferenceModel): UserreferenceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new UserreferenceDTO();
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
	public getEmptyModel(): UserreferenceModel {
		const model = new UserreferenceModel();
		model.user = UserUtilConverter.toModel();
		model.contactreference = ContactreferenceUtilConverter.toModel();
		model.tpcontactreference = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): UserreferenceDTO {
		const dto = new UserreferenceDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.contactreference_fk = ContactreferenceUtilConverter.toDto();
		dto.tpcontactreference_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class UserreferenceUtilConverter {
	static toDto(model?: UserreferenceModel) {
		const converter = new UserreferenceConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: UserreferenceDTO) {
		const converter = new UserreferenceConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: UserreferenceModel[]) {
		const converter = new UserreferenceConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: UserreferenceDTO[]) {
		const converter = new UserreferenceConverter();
		return converter.convertToModelList(dtos);
	}
}
