import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ReservationsettingModel } from '../models/reservationsetting.model';
import { ReservationsettingDTO } from '../dtos/reservationsetting.dto';

export class ReservationsettingConverter extends BaseApiConverter<
	ReservationsettingModel,
	ReservationsettingDTO
> {
	public convertToModel(dto?: ReservationsettingDTO): ReservationsettingModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ReservationsettingModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.dailyweeks = dto.dailyweeks;
		model.dailymonths = dto.dailymonths;
		model.hhreservefrom = dto.hhreservefrom;
		model.hhreserveto = dto.hhreserveto;
		model.dtafrom = dto.dtafrom;
		model.dtato = dto.dtato;
		return model;
	}
	public convertToDto(model?: ReservationsettingModel): ReservationsettingDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ReservationsettingDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.dailyweeks = model.dailyweeks;
		dto.dailymonths = model.dailymonths;
		dto.hhreservefrom = model.hhreservefrom;
		dto.hhreserveto = model.hhreserveto;
		dto.dtafrom = model.dtafrom;
		dto.dtato = model.dtato;
		return dto;
	}
	public getEmptyModel(): ReservationsettingModel {
		const model = new ReservationsettingModel();
		return model;
	}
	public getEmptyDto(): ReservationsettingDTO {
		const dto = new ReservationsettingDTO();
		return dto;
	}
}

export class ReservationsettingUtilConverter {
	static toDto(model?: ReservationsettingModel) {
		const converter = new ReservationsettingConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ReservationsettingDTO) {
		const converter = new ReservationsettingConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ReservationsettingModel[]) {
		const converter = new ReservationsettingConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ReservationsettingDTO[]) {
		const converter = new ReservationsettingConverter();
		return converter.convertToModelList(dtos);
	}
}
