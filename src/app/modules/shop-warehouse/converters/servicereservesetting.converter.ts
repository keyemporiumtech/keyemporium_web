import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ServicereservesettingModel } from '../models/servicereservesetting.model';
import { ServicereservesettingDTO } from '../dtos/servicereservesetting.dto';
import { ServiceConverter, ServiceUtilConverter } from './service.converter';
import { ServiceModel } from '../models/service.model';
import {
	ReservationsettingConverter,
	ReservationsettingUtilConverter,
} from './reservationsetting.converter';
import { ReservationsettingModel } from '../models/reservationsetting.model';

export class ServicereservesettingConverter extends BaseApiConverter<
	ServicereservesettingModel,
	ServicereservesettingDTO
> {
	public convertToModel(dto?: ServicereservesettingDTO): ServicereservesettingModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ServicereservesettingModel();
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
			this.getPropertyForFk('settings', 'settings_fk', new ReservationsettingConverter()),
			new ReservationsettingModel(),
		);
		return model;
	}
	public convertToDto(model?: ServicereservesettingModel): ServicereservesettingDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ServicereservesettingDTO();
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
			this.getPropertyForFk('settings', 'settings_fk', new ReservationsettingConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ServicereservesettingModel {
		const model = new ServicereservesettingModel();
		model.service = ServiceUtilConverter.toModel();
		model.settings = ReservationsettingUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ServicereservesettingDTO {
		const dto = new ServicereservesettingDTO();
		dto.service_fk = ServiceUtilConverter.toDto();
		dto.settings_fk = ReservationsettingUtilConverter.toDto();
		return dto;
	}
}

export class ServicereservesettingUtilConverter {
	static toDto(model?: ServicereservesettingModel) {
		const converter = new ServicereservesettingConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ServicereservesettingDTO) {
		const converter = new ServicereservesettingConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ServicereservesettingModel[]) {
		const converter = new ServicereservesettingConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ServicereservesettingDTO[]) {
		const converter = new ServicereservesettingConverter();
		return converter.convertToModelList(dtos);
	}
}
