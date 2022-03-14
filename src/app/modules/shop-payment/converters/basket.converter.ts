import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { BasketModel } from '../models/basket.model';
import { BasketDTO } from '../dtos/basket.dto';
import { UserConverter, UserUtilConverter } from '../../authentication/converters/user.converter';
import { UserModel } from '../../authentication/models/user.model';
import {
	ActivityConverter,
	ActivityUtilConverter,
} from '../../authentication/converters/activity.converter';
import { ActivityModel } from '../../authentication/models/activity.model';

export class BasketConverter extends BaseApiConverter<BasketModel, BasketDTO> {
	public convertToModel(dto?: BasketDTO): BasketModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new BasketModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.website = dto.website;
		model.title = dto.title;
		this.convertBooleanToModel(dto, model, 'flgclosed');
		this.convertBooleanToModel(dto, model, 'flgreserve');
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
			new UserModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
			new ActivityModel(),
		);
		model.email = dto.email;
		model.phone = dto.phone;
		model.emailto = dto.emailto;
		model.phoneto = dto.phoneto;
		model.strto = dto.strto;
		model.note = dto.note;
		return model;
	}
	public convertToDto(model?: BasketModel): BasketDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new BasketDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.website = model.website;
		dto.title = model.title;
		this.convertBooleanToDto(dto, model, 'flgclosed');
		this.convertBooleanToDto(dto, model, 'flgreserve');
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('user', 'user_fk', new UserConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('activity', 'activity_fk', new ActivityConverter()),
		);
		dto.email = model.email;
		dto.phone = model.phone;
		dto.emailto = model.emailto;
		dto.phoneto = model.phoneto;
		dto.strto = model.strto;
		dto.note = model.note;
		return dto;
	}
	public getEmptyModel(): BasketModel {
		const model = new BasketModel();
		model.user = UserUtilConverter.toModel();
		model.activity = ActivityUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): BasketDTO {
		const dto = new BasketDTO();
		dto.user_fk = UserUtilConverter.toDto();
		dto.activity_fk = ActivityUtilConverter.toDto();
		return dto;
	}
}

export class BasketUtilConverter {
	static toDto(model?: BasketModel) {
		const converter = new BasketConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: BasketDTO) {
		const converter = new BasketConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: BasketModel[]) {
		const converter = new BasketConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: BasketDTO[]) {
		const converter = new BasketConverter();
		return converter.convertToModelList(dtos);
	}
}
