import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PocketdiscountModel } from '../models/pocketdiscount.model';
import { PocketdiscountDTO } from '../dtos/pocketdiscount.dto';
import { PocketConverter, PocketUtilConverter } from './pocket.converter';
import { PocketModel } from '../models/pocket.model';
import { DiscountConverter, DiscountUtilConverter } from './discount.converter';
import { DiscountModel } from '../models/discount.model';

export class PocketdiscountConverter extends BaseApiConverter<
	PocketdiscountModel,
	PocketdiscountDTO
> {
	public convertToModel(dto?: PocketdiscountDTO): PocketdiscountModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PocketdiscountModel();
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
			this.getPropertyForFk('discount', 'discount_fk', new DiscountConverter()),
			new DiscountModel(),
		);
		return model;
	}
	public convertToDto(model?: PocketdiscountModel): PocketdiscountDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PocketdiscountDTO();
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
			this.getPropertyForFk('discount', 'discount_fk', new DiscountConverter()),
		);
		return dto;
	}
	public getEmptyModel(): PocketdiscountModel {
		const model = new PocketdiscountModel();
		model.pocket = PocketUtilConverter.toModel();
		model.discount = DiscountUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): PocketdiscountDTO {
		const dto = new PocketdiscountDTO();
		dto.pocket_fk = PocketUtilConverter.toDto();
		dto.discount_fk = DiscountUtilConverter.toDto();
		return dto;
	}
}

export class PocketdiscountUtilConverter {
	static toDto(model?: PocketdiscountModel) {
		const converter = new PocketdiscountConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: PocketdiscountDTO) {
		const converter = new PocketdiscountConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: PocketdiscountModel[]) {
		const converter = new PocketdiscountConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: PocketdiscountDTO[]) {
		const converter = new PocketdiscountConverter();
		return converter.convertToModelList(dtos);
	}
}
