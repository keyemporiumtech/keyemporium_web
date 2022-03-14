import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ProductreservesettingModel } from '../models/productreservesetting.model';
import { ProductreservesettingDTO } from '../dtos/productreservesetting.dto';
import { ProductConverter, ProductUtilConverter } from './product.converter';
import { ProductModel } from '../models/product.model';
import {
	ReservationsettingConverter,
	ReservationsettingUtilConverter,
} from './reservationsetting.converter';
import { ReservationsettingModel } from '../models/reservationsetting.model';

export class ProductreservesettingConverter extends BaseApiConverter<
	ProductreservesettingModel,
	ProductreservesettingDTO
> {
	public convertToModel(dto?: ProductreservesettingDTO): ProductreservesettingModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProductreservesettingModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('product', 'product_fk', new ProductConverter()),
			new ProductModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('settings', 'settings_fk', new ReservationsettingConverter()),
			new ReservationsettingModel(),
		);
		return model;
	}
	public convertToDto(model?: ProductreservesettingModel): ProductreservesettingDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProductreservesettingDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('product', 'product_fk', new ProductConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('settings', 'settings_fk', new ReservationsettingConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ProductreservesettingModel {
		const model = new ProductreservesettingModel();
		model.product = ProductUtilConverter.toModel();
		model.settings = ReservationsettingUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProductreservesettingDTO {
		const dto = new ProductreservesettingDTO();
		dto.product_fk = ProductUtilConverter.toDto();
		dto.settings_fk = ReservationsettingUtilConverter.toDto();
		return dto;
	}
}

export class ProductreservesettingUtilConverter {
	static toDto(model?: ProductreservesettingModel) {
		const converter = new ProductreservesettingConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ProductreservesettingDTO) {
		const converter = new ProductreservesettingConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ProductreservesettingModel[]) {
		const converter = new ProductreservesettingConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ProductreservesettingDTO[]) {
		const converter = new ProductreservesettingConverter();
		return converter.convertToModelList(dtos);
	}
}
