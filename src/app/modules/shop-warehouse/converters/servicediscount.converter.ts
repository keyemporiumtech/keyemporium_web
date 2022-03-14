import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ServicediscountModel } from '../models/servicediscount.model';
import { ServicediscountDTO } from '../dtos/servicediscount.dto';
import { ServiceConverter, ServiceUtilConverter } from './service.converter';
import { ServiceModel } from '../models/service.model';
import { DiscountConverter, DiscountUtilConverter } from './discount.converter';
import { DiscountModel } from '../models/discount.model';

export class ServicediscountConverter extends BaseApiConverter<
	ServicediscountModel,
	ServicediscountDTO
> {
	public convertToModel(dto?: ServicediscountDTO): ServicediscountModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ServicediscountModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('service', 'service_fk', new ServiceConverter()),
			new ServiceModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('discount', 'discount_fk', new DiscountConverter()),
			new DiscountModel(),
		);
		return model;
	}
	public convertToDto(model?: ServicediscountModel): ServicediscountDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ServicediscountDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('service', 'service_fk', new ServiceConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('discount', 'discount_fk', new DiscountConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ServicediscountModel {
		const model = new ServicediscountModel();
		model.service = ServiceUtilConverter.toModel();
		model.discount = DiscountUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ServicediscountDTO {
		const dto = new ServicediscountDTO();
		dto.service_fk = ServiceUtilConverter.toDto();
		dto.discount_fk = DiscountUtilConverter.toDto();
		return dto;
	}
}

export class ServicediscountUtilConverter {
	static toDto(model?: ServicediscountModel) {
		const converter = new ServicediscountConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ServicediscountDTO) {
		const converter = new ServicediscountConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ServicediscountModel[]) {
		const converter = new ServicediscountConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ServicediscountDTO[]) {
		const converter = new ServicediscountConverter();
		return converter.convertToModelList(dtos);
	}
}
