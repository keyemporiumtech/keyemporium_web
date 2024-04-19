import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { NewsletterDTO } from '../dtos/newsletter.dto';
import { NewsletterModel } from '../models/newsletter.model';

export class NewsletterConverter extends BaseApiConverter<NewsletterModel, NewsletterDTO> {
	public convertToModel(dto?: NewsletterDTO): NewsletterModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new NewsletterModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.description = dto.description;
		return model;
	}
	public convertToDto(model?: NewsletterModel): NewsletterDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new NewsletterDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.description = model.description;
		return dto;
	}
	public getEmptyModel(): NewsletterModel {
		const model = new NewsletterModel();
		return model;
	}
	public getEmptyDto(): NewsletterDTO {
		const dto = new NewsletterDTO();
		return dto;
	}
}

export class NewsletterUtilConverter {
	static toDto(model?: NewsletterModel) {
		const converter = new NewsletterConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: NewsletterDTO) {
		const converter = new NewsletterConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: NewsletterModel[]) {
		const converter = new NewsletterConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: NewsletterDTO[]) {
		const converter = new NewsletterConverter();
		return converter.convertToModelList(dtos);
	}
}
