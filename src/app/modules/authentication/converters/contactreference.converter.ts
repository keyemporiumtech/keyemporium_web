import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ContactreferenceDTO } from '../dtos/contactreference.dto';
import { ContactreferenceModel } from '../models/contactreference.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../../api/cakeutils-be/converters/typological.converter';
import { TypeConverter } from '@ddc/kit';
import { EnumContactreferenceType } from '../enums/contactreference-type.enum';
import { EnumSocialreferenceType } from '../enums/socialreference-type.enum';

export class ContactreferenceConverter extends BaseApiConverter<
	ContactreferenceModel,
	ContactreferenceDTO
> {
	private tpcontactreferenceEnumConverter = new TypeConverter<string, EnumContactreferenceType>();
	private tpsocialreferenceEnumConverter = new TypeConverter<string, EnumSocialreferenceType>();

	public convertToModel(dto?: ContactreferenceDTO): ContactreferenceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ContactreferenceModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.val = dto.val;
		model.description = dto.description;
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
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk(
				'tpsocialreference',
				'tpsocialreference_fk',
				new TypologicalConverter(),
			),
			new TypologicalModel(),
		);
		model.prefix = dto.prefix;
		this.convertBooleanToModel(dto, model, 'flgused');
		// added
		model.nationimage = dto.nationimage;
		model.referenceimage = dto.referenceimage;
		model.socialimage = dto.socialimage;
		// enums
		model.tpcontactreferenceEnum = this.tpcontactreferenceEnumConverter.convertToB(
			dto.tpcontactreference,
		);
		model.tpsocialreferenceEnum = this.tpsocialreferenceEnumConverter.convertToB(
			dto.tpsocialreference,
		);
		return model;
	}
	public convertToDto(model?: ContactreferenceModel): ContactreferenceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ContactreferenceDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.val = model.val;
		dto.description = model.description;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk(
				'tpcontactreference',
				'tpcontactreference_fk',
				new TypologicalConverter(),
			),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk(
				'tpsocialreference',
				'tpsocialreference_fk',
				new TypologicalConverter(),
			),
		);
		dto.prefix = model.prefix;
		this.convertBooleanToDto(dto, model, 'flgused');
		// added
		dto.nationimage = model.nationimage;
		dto.referenceimage = model.referenceimage;
		dto.socialimage = model.socialimage;
		return dto;
	}
	public getEmptyModel(): ContactreferenceModel {
		const model = new ContactreferenceModel();
		model.tpcontactreference = TypologicalUtilConverter.toModel();
		model.tpsocialreference = TypologicalUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ContactreferenceDTO {
		const dto = new ContactreferenceDTO();
		dto.tpcontactreference_fk = TypologicalUtilConverter.toDto();
		dto.tpsocialreference_fk = TypologicalUtilConverter.toDto();
		return dto;
	}
}

export class ContactreferenceUtilConverter {
	static toDto(model?: ContactreferenceModel) {
		const converter = new ContactreferenceConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ContactreferenceDTO) {
		const converter = new ContactreferenceConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ContactreferenceModel[]) {
		const converter = new ContactreferenceConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ContactreferenceDTO[]) {
		const converter = new ContactreferenceConverter();
		return converter.convertToModelList(dtos);
	}
}
