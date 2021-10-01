import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ClienttokenDTO } from '../dtos/clienttoken.dto';
import { ClienttokenModel } from '../models/clienttoken.model';

export class ClienttokenConverter extends BaseApiConverter<ClienttokenModel, ClienttokenDTO> {
	public convertToModel(dto?: ClienttokenDTO): ClienttokenModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ClienttokenModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.appname = dto.appname;
		model.token = dto.token;
		return model;
	}
	public convertToDto(model?: ClienttokenModel): ClienttokenDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ClienttokenDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.appname = model.appname;
		dto.token = model.token;
		return dto;
	}
	public getEmptyModel(): ClienttokenModel {
		const model = new ClienttokenModel();
		return model;
	}
	public getEmptyDto(): ClienttokenDTO {
		const dto = new ClienttokenDTO();
		return dto;
	}
}

export class ClienttokenUtilConverter {
	static toDto(model?: ClienttokenModel) {
		const converter = new ClienttokenConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ClienttokenDTO) {
		const converter = new ClienttokenConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ClienttokenModel[]) {
		const converter = new ClienttokenConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ClienttokenDTO[]) {
		const converter = new ClienttokenConverter();
		return converter.convertToModelList(dtos);
	}
}
