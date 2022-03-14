import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PocketreservesettingModel } from '../models/pocketreservesetting.model';
import { PocketreservesettingDTO } from '../dtos/pocketreservesetting.dto';
import { PocketConverter, PocketUtilConverter } from './pocket.converter';
import { PocketModel } from '../models/pocket.model';
import {
	ReservationsettingConverter,
	ReservationsettingUtilConverter,
} from './reservationsetting.converter';
import { ReservationsettingModel } from '../models/reservationsetting.model';

export class PocketreservesettingConverter extends BaseApiConverter<
	PocketreservesettingModel,
	PocketreservesettingDTO
> {
	public convertToModel(dto?: PocketreservesettingDTO): PocketreservesettingModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PocketreservesettingModel();
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
			this.getPropertyForFk('settings', 'settings_fk', new ReservationsettingConverter()),
			new ReservationsettingModel(),
		);
		return model;
	}
	public convertToDto(model?: PocketreservesettingModel): PocketreservesettingDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PocketreservesettingDTO();
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
			this.getPropertyForFk('settings', 'settings_fk', new ReservationsettingConverter()),
		);
		return dto;
	}
	public getEmptyModel(): PocketreservesettingModel {
		const model = new PocketreservesettingModel();
		model.pocket = PocketUtilConverter.toModel();
		model.settings = ReservationsettingUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): PocketreservesettingDTO {
		const dto = new PocketreservesettingDTO();
		dto.pocket_fk = PocketUtilConverter.toDto();
		dto.settings_fk = ReservationsettingUtilConverter.toDto();
		return dto;
	}
}

export class PocketreservesettingUtilConverter {
	static toDto(model?: PocketreservesettingModel) {
		const converter = new PocketreservesettingConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: PocketreservesettingDTO) {
		const converter = new PocketreservesettingConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: PocketreservesettingModel[]) {
		const converter = new PocketreservesettingConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: PocketreservesettingDTO[]) {
		const converter = new PocketreservesettingConverter();
		return converter.convertToModelList(dtos);
	}
}
