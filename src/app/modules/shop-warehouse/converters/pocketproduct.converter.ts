import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PocketproductModel } from '../models/pocketproduct.model';
import { PocketproductDTO } from '../dtos/pocketproduct.dto';
import { PocketConverter, PocketUtilConverter } from './pocket.converter';
import { PocketModel } from '../models/pocket.model';
import { ProductConverter, ProductUtilConverter } from './product.converter';
import { ProductModel } from '../models/product.model';

export class PocketproductConverter extends BaseApiConverter<PocketproductModel, PocketproductDTO> {
	public convertToModel(dto?: PocketproductDTO): PocketproductModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PocketproductModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('pocket', 'pocket_fk', new PocketConverter()),
			new PocketModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('product', 'product_fk', new ProductConverter()),
			new ProductModel(),
		);
		return model;
	}
	public convertToDto(model?: PocketproductModel): PocketproductDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PocketproductDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('pocket', 'pocket_fk', new PocketConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('product', 'product_fk', new ProductConverter()),
		);
		return dto;
	}
	public getEmptyModel(): PocketproductModel {
		const model = new PocketproductModel();
		model.pocket = PocketUtilConverter.toModel();
		model.product = ProductUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): PocketproductDTO {
		const dto = new PocketproductDTO();
		dto.pocket_fk = PocketUtilConverter.toDto();
		dto.product_fk = ProductUtilConverter.toDto();
		return dto;
	}
}

export class PocketproductUtilConverter {
	static toDto(model?: PocketproductModel) {
		const converter = new PocketproductConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: PocketproductDTO) {
		const converter = new PocketproductConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: PocketproductModel[]) {
		const converter = new PocketproductConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: PocketproductDTO[]) {
		const converter = new PocketproductConverter();
		return converter.convertToModelList(dtos);
	}
}
