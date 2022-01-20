import { CookieStatusDTO } from '../dtos/cookie-status.dto';
import { CookieStatusModel } from '../models/cookie-status.model';
import { BaseApiConverter } from '../../cakeutils/base/base-api.converter';

export class CookieStatusConverter extends BaseApiConverter<CookieStatusModel, CookieStatusDTO> {
	public convertToModel(dto?: CookieStatusDTO): CookieStatusModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new CookieStatusModel();
		// this.convertCommonPropertiesToModel(dto, model);
		this.convertBooleanToModel(dto, model, 'isNecessary');
		this.convertBooleanToModel(dto, model, 'isPreference');
		this.convertBooleanToModel(dto, model, 'isStatistic');
		this.convertBooleanToModel(dto, model, 'isMarketing');
		this.convertBooleanToModel(dto, model, 'isNotClassified');
		this.convertBooleanToModel(dto, model, 'value');
		return model;
	}
	public convertToDto(model?: CookieStatusModel): CookieStatusDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new CookieStatusDTO();
		// this.convertCommonPropertiesToDto(dto, model);
		this.convertBooleanToDto(dto, model, 'isNecessary');
		this.convertBooleanToDto(dto, model, 'isPreference');
		this.convertBooleanToDto(dto, model, 'isStatistic');
		this.convertBooleanToDto(dto, model, 'isMarketing');
		this.convertBooleanToDto(dto, model, 'isNotClassified');
		this.convertBooleanToDto(dto, model, 'value');
		return dto;
	}
	public getEmptyModel(): CookieStatusModel {
		const model = new CookieStatusModel();
		return model;
	}
	public getEmptyDto(): CookieStatusDTO {
		const dto = new CookieStatusDTO();
		return dto;
	}
}

export class CookieStatusUtilConverter {
	static toDto(model?: CookieStatusModel) {
		const converter = new CookieStatusConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: CookieStatusDTO) {
		const converter = new CookieStatusConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: CookieStatusModel[]) {
		const converter = new CookieStatusConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: CookieStatusDTO[]) {
		const converter = new CookieStatusConverter();
		return converter.convertToModelList(dtos);
	}
}
