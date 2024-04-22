import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	NewsletterConverter,
	NewsletterUtilConverter,
} from '../../authentication/converters/newsletter.converter';
import { NewsletterModel } from '../../authentication/models/newsletter.model';
import { MailnewsletterDTO } from '../dtos/mailnewsletter.dto';
import { MailModel } from '../models/mail.model';
import { MailnewsletterModel } from '../models/mailnewsletter.model';
import { MailConverter, MailUtilConverter } from './mail.converter';

export class MailnewsletterConverter extends BaseApiConverter<
	MailnewsletterModel,
	MailnewsletterDTO
> {
	public convertToModel(dto?: MailnewsletterDTO): MailnewsletterModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new MailnewsletterModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('mail', 'mail_fk', new MailConverter()),
			new MailModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('newsletter', 'newsletter_fk', new NewsletterConverter()),
			new NewsletterModel(),
		);
		return model;
	}
	public convertToDto(model?: MailnewsletterModel): MailnewsletterDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new MailnewsletterDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('mail', 'mail_fk', new MailConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('newsletter', 'newsletter_fk', new NewsletterConverter()),
		);
		return dto;
	}
	public getEmptyModel(): MailnewsletterModel {
		const model = new MailnewsletterModel();
		model.mail = MailUtilConverter.toModel();
		model.newsletter = NewsletterUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): MailnewsletterDTO {
		const dto = new MailnewsletterDTO();
		dto.mail_fk = MailUtilConverter.toDto();
		dto.newsletter_fk = NewsletterUtilConverter.toDto();
		return dto;
	}
}

export class MailnewsletterUtilConverter {
	static toDto(model?: MailnewsletterModel) {
		const converter = new MailnewsletterConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: MailnewsletterDTO) {
		const converter = new MailnewsletterConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: MailnewsletterModel[]) {
		const converter = new MailnewsletterConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: MailnewsletterDTO[]) {
		const converter = new MailnewsletterConverter();
		return converter.convertToModelList(dtos);
	}
}
