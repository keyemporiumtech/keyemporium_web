import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { ActivitynewsletterDTO } from '../dtos/activitynewsletter.dto';
import { ActivityModel } from '../models/activity.model';
import { ActivitynewsletterModel } from '../models/activitynewsletter.model';
import { NewsletterModel } from '../models/newsletter.model';
import { ActivityConverter, ActivityUtilConverter } from './activity.converter';
import { NewsletterConverter, NewsletterUtilConverter } from './newsletter.converter';

export class ActivitynewsletterConverter extends BaseApiConverter<
	ActivitynewsletterModel,
	ActivitynewsletterDTO
> {
	public convertToModel(dto?: ActivitynewsletterDTO): ActivitynewsletterModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ActivitynewsletterModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('newsletter', 'newsletter_fk', new NewsletterConverter()),
			new NewsletterModel(),
		);
		return model;
	}
	public convertToDto(model?: ActivitynewsletterModel): ActivitynewsletterDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ActivitynewsletterDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('newsletter', 'newsletter_fk', new NewsletterConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ActivitynewsletterModel {
		const model = new ActivitynewsletterModel();
		model.activity = ActivityUtilConverter.toModel();
		model.newsletter = NewsletterUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ActivitynewsletterDTO {
		const dto = new ActivitynewsletterDTO();
		dto.activity_fk = ActivityUtilConverter.toDto();
		dto.newsletter_fk = NewsletterUtilConverter.toDto();
		return dto;
	}
}

export class ActivitynewsletterUtilConverter {
	static toDto(model?: ActivitynewsletterModel) {
		const converter = new ActivitynewsletterConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: ActivitynewsletterDTO) {
		const converter = new ActivitynewsletterConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: ActivitynewsletterModel[]) {
		const converter = new ActivitynewsletterConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: ActivitynewsletterDTO[]) {
		const converter = new ActivitynewsletterConverter();
		return converter.convertToModelList(dtos);
	}
}
