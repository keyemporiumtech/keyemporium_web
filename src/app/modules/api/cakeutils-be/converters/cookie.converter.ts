import { TypeConverter } from '@ddc/kit';
import { CookieDTO } from '../dtos/cookie.dto';
import { CookieModel } from '../models/cookie.model';
import { EnumCookieType } from '../../../../shared/enums/cookie/cookie-type.enum';
import { BaseApiConverter } from '../../cakeutils/base/base-api.converter';

export class CookieConverter extends BaseApiConverter<CookieModel, CookieDTO> {
	private typeEnumConverter = new TypeConverter<string, EnumCookieType>();

	public convertToModel(dto?: CookieDTO): CookieModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new CookieModel();
		// this.convertCommonPropertiesToModel(dto, model);
		model.name = dto.name;
		model.description = dto.description;
		model.duration = dto.duration;
		model.durationDesc = dto.durationDesc;
		model.type = dto.type;
		model.value = dto.value;
		this.convertBooleanToModel(dto, model, 'hash');
		model.protocol = dto.protocol;
		model.link = dto.link;
		// enums
		model.typeEnum = this.typeEnumConverter.convertToB(dto.type);
		return model;
	}
	public convertToDto(model?: CookieModel): CookieDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new CookieDTO();
		// this.convertCommonPropertiesToDto(dto, model);
		dto.name = model.name;
		dto.description = model.description;
		dto.duration = model.duration;
		dto.durationDesc = model.durationDesc;
		dto.type = model.type;
		dto.value = model.value;
		this.convertBooleanToDto(dto, model, 'hash');
		dto.protocol = model.protocol;
		dto.link = model.link;
		return dto;
	}
	public getEmptyModel(): CookieModel {
		const model = new CookieModel();
		return model;
	}
	public getEmptyDto(): CookieDTO {
		const dto = new CookieDTO();
		return dto;
	}
}

export class CookieUtilConverter {
	static toDto(model?: CookieModel) {
		const converter = new CookieConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: CookieDTO) {
		const converter = new CookieConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: CookieModel[]) {
		const converter = new CookieConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: CookieDTO[]) {
		const converter = new CookieConverter();
		return converter.convertToModelList(dtos);
	}
}
