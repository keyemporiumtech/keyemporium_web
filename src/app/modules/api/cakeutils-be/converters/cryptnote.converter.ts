import { BaseApiConverter } from '../../cakeutils/base/base-api.converter';
import { CryptnoteDTO } from '../dtos/cryptnote.dto';
import { CryptnoteModel } from '../models/cryptnote.model';

export class CryptnoteConverter extends BaseApiConverter<CryptnoteModel, CryptnoteDTO> {
	public convertToModel(dto?: CryptnoteDTO): CryptnoteModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new CryptnoteModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.description = dto.description;
		model.crypt = dto.crypt;
		model.symbol = dto.symbol;
		this.convertBooleanToModel(dto, model, 'flgused');
		return model;
	}
	public convertToDto(model?: CryptnoteModel): CryptnoteDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new CryptnoteDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.description = model.description;
		dto.crypt = model.crypt;
		dto.symbol = model.symbol;
		this.convertBooleanToDto(dto, model, 'flgused');
		return dto;
	}
	public getEmptyModel(): CryptnoteModel {
		const model = new CryptnoteModel();
		return model;
	}
	public getEmptyDto(): CryptnoteDTO {
		const dto = new CryptnoteDTO();
		return dto;
	}
}

export class CryptnoteUtilConverter {
	static toDto(model?: CryptnoteModel) {
		const converter = new CryptnoteConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: CryptnoteDTO) {
		const converter = new CryptnoteConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: CryptnoteModel[]) {
		const converter = new CryptnoteConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: CryptnoteDTO[]) {
		const converter = new CryptnoteConverter();
		return converter.convertToModelList(dtos);
	}
}
