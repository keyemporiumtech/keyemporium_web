import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	ContactreferenceConverter,
	ContactreferenceUtilConverter,
} from '../../authentication/converters/contactreference.converter';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';
import { ProfessionreferenceDTO } from '../dtos/professionreference.dto';
import { ProfessionModel } from '../models/profession.model';
import { ProfessionreferenceModel } from '../models/professionreference.model';
import { ProfessionConverter, ProfessionUtilConverter } from './profession.converter';

export class ProfessionreferenceConverter extends BaseApiConverter<
	ProfessionreferenceModel,
	ProfessionreferenceDTO
> {
	public convertToModel(dto?: ProfessionreferenceDTO): ProfessionreferenceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProfessionreferenceModel();
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
			this.getPropertyForFk(
				'contactreference',
				'contactreference_fk',
				new ContactreferenceConverter(),
			),
			new ContactreferenceModel(),
		);
		return model;
	}
	public convertToDto(model?: ProfessionreferenceModel): ProfessionreferenceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProfessionreferenceDTO();
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
			this.getPropertyForFk(
				'contactreference',
				'contactreference_fk',
				new ContactreferenceConverter(),
			),
		);
		return dto;
	}
	public getEmptyModel(): ProfessionreferenceModel {
		const model = new ProfessionreferenceModel();
		model.profession = ProfessionUtilConverter.toModel();
		model.contactreference = ContactreferenceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProfessionreferenceDTO {
		const dto = new ProfessionreferenceDTO();
		dto.profession_fk = ProfessionUtilConverter.toDto();
		dto.contactreference_fk = ContactreferenceUtilConverter.toDto();
		return dto;
	}
}

export class ProfessionreferenceUtilConverter {
	static toDto(model?: ProfessionreferenceModel) {
		const converter = new ProfessionreferenceConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ProfessionreferenceDTO) {
		const converter = new ProfessionreferenceConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ProfessionreferenceModel[]) {
		const converter = new ProfessionreferenceConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ProfessionreferenceDTO[]) {
		const converter = new ProfessionreferenceConverter();
		return converter.convertToModelList(dtos);
	}
}
