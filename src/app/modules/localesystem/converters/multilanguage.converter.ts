import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { MultilanguageDTO } from '../dtos/multilanguage.dto';
import { MultilanguageModel } from '../models/multilanguage.model';
import { LanguageConverter, LanguageUtilConverter } from './language.converter';
import { LanguageModel } from '../models/language.model';

export class MultilanguageConverter extends BaseApiConverter<MultilanguageModel, MultilanguageDTO> {
	public convertToModel(dto?: MultilanguageDTO): MultilanguageModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new MultilanguageModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.tablename = dto.tablename;
		model.fieldname = dto.fieldname;
		model.content = dto.content;
		model.objraw = dto.objraw;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('language', 'language_fk', new LanguageConverter(), 'languageid'),
			new LanguageModel(),
		);
		model.languagecod = dto.languagecod;
		model.type = dto.type;
		return model;
	}
	public convertToDto(model?: MultilanguageModel): MultilanguageDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new MultilanguageDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.tablename = model.tablename;
		dto.fieldname = model.fieldname;
		dto.content = model.content;
		dto.objraw = model.objraw;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('language', 'language_fk', new LanguageConverter(), 'languageid'),
		);
		dto.languagecod = model.languagecod;
		dto.type = model.type;
		return dto;
	}
	public getEmptyModel(): MultilanguageModel {
		const model = new MultilanguageModel();
		model.language = LanguageUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): MultilanguageDTO {
		const dto = new MultilanguageDTO();
		dto.language_fk = LanguageUtilConverter.toDto();
		return dto;
	}
}

export class MultilanguageUtilConverter {
	static toDto(model?: MultilanguageModel) {
		const converter = new MultilanguageConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: MultilanguageDTO) {
		const converter = new MultilanguageConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: MultilanguageModel[]) {
		const converter = new MultilanguageConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: MultilanguageDTO[]) {
		const converter = new MultilanguageConverter();
		return converter.convertToModelList(dtos);
	}
}
