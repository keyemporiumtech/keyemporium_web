import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { BrandreferenceModel } from '../models/brandreference.model';
import { BrandreferenceDTO } from '../dtos/brandreference.dto';
import { BrandConverter, BrandUtilConverter } from './brand.converter';
import { BrandModel } from '../models/brand.model';
import {
	ContactreferenceConverter,
	ContactreferenceUtilConverter,
} from '../../authentication/converters/contactreference.converter';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';

export class BrandreferenceConverter extends BaseApiConverter<
	BrandreferenceModel,
	BrandreferenceDTO
> {
	public convertToModel(dto?: BrandreferenceDTO): BrandreferenceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BrandreferenceModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('brand', 'brand_fk', new BrandConverter()),
			new BrandModel(),
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
	public convertToDto(model?: BrandreferenceModel): BrandreferenceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BrandreferenceDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('brand', 'brand_fk', new BrandConverter()),
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
	public getEmptyModel(): BrandreferenceModel {
		const model = new BrandreferenceModel();
		model.brand = BrandUtilConverter.toModel();
		model.contactreference = ContactreferenceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BrandreferenceDTO {
		const dto = new BrandreferenceDTO();
		dto.brand_fk = BrandUtilConverter.toDto();
		dto.contactreference_fk = ContactreferenceUtilConverter.toDto();
		return dto;
	}
}

export class BrandreferenceUtilConverter {
	static toDto(model?: BrandreferenceModel) {
		const converter = new BrandreferenceConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BrandreferenceDTO) {
		const converter = new BrandreferenceConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BrandreferenceModel[]) {
		const converter = new BrandreferenceConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BrandreferenceDTO[]) {
		const converter = new BrandreferenceConverter();
		return converter.convertToModelList(dtos);
	}
}
