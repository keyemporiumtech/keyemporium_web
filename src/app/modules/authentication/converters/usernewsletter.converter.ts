import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UsernewsletterDTO } from '../dtos/usernewsletter.dto';
import { NewsletterModel } from '../models/newsletter.model';
import { UserModel } from '../models/user.model';
import { UsernewsletterModel } from '../models/usernewsletter.model';
import { NewsletterConverter, NewsletterUtilConverter } from './newsletter.converter';
import { UserConverter, UserUtilConverter } from './user.converter';

export class UsernewsletterConverter extends BaseApiConverter<
	UsernewsletterModel,
	UsernewsletterDTO
> {
	public convertToModel(dto?: UsernewsletterDTO): UsernewsletterModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new UsernewsletterModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('newsletter', 'newsletter_fk', new NewsletterConverter()),
			new NewsletterModel(),
		);
		return model;
	}
	public convertToDto(model?: UsernewsletterModel): UsernewsletterDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new UsernewsletterDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('newsletter', 'newsletter_fk', new NewsletterConverter()),
		);
		return dto;
	}
	public getEmptyModel(): UsernewsletterModel {
		const model = new UsernewsletterModel();
		model.user = UserUtilConverter.toModel();
		model.newsletter = NewsletterUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): UsernewsletterDTO {
		const dto = new UsernewsletterDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.newsletter_fk = NewsletterUtilConverter.toDto();
		return dto;
	}
}

export class UsernewsletterUtilConverter {
	static toDto(model?: UsernewsletterModel) {
		const converter = new UsernewsletterConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: UsernewsletterDTO) {
		const converter = new UsernewsletterConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: UsernewsletterModel[]) {
		const converter = new UsernewsletterConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: UsernewsletterDTO[]) {
		const converter = new UsernewsletterConverter();
		return converter.convertToModelList(dtos);
	}
}
