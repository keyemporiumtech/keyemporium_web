import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	ActivityConverter,
	ActivityUtilConverter,
} from '../../authentication/converters/activity.converter';
import { ActivityModel } from '../../authentication/models/activity.model';
import { CityConverter, CityUtilConverter } from '../../localesystem/converters/city.converter';
import {
	NationConverter,
	NationUtilConverter,
} from '../../localesystem/converters/nation.converter';
import { CityModel } from '../../localesystem/models/city.model';
import { NationModel } from '../../localesystem/models/nation.model';
import { WorkexperienceDTO } from '../dtos/workexperience.dto';
import { WorkexperienceModel } from '../models/workexperience.model';
import { WorkroleModel } from '../models/workrole.model';
import { WorkroleConverter, WorkroleUtilConverter } from './workrole.converter';

export class WorkexperienceConverter extends BaseApiConverter<
	WorkexperienceModel,
	WorkexperienceDTO
> {
	public convertToModel(dto?: WorkexperienceDTO): WorkexperienceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new WorkexperienceModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.title = dto.title;
		model.description = dto.description;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('company', 'company_fk', new ActivityConverter()),
			new ActivityModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('role', 'role_fk', new WorkroleConverter()),
			new WorkroleModel(),
		);
		model.place = dto.place;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('nation', 'nation_fk', new NationConverter()),
			new NationModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('city', 'city_fk', new CityConverter()),
			new CityModel(),
		);
		model.dtainit = dto.dtainit;
		model.dtaend = dto.dtaend;
		return model;
	}
	public convertToDto(model?: WorkexperienceModel): WorkexperienceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new WorkexperienceDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.title = model.title;
		dto.description = model.description;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('company', 'company_fk', new ActivityConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('role', 'role_fk', new WorkroleConverter()),
		);
		dto.place = model.place;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('nation', 'nation_fk', new NationConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('city', 'city_fk', new CityConverter()),
		);
		this.convertDateToDto(dto, model, 'dtainit', 'dtainitModel');
		this.convertDateToDto(dto, model, 'dtaend', 'dtaendModel');
		return dto;
	}
	public getEmptyModel(): WorkexperienceModel {
		const model = new WorkexperienceModel();
		model.company = ActivityUtilConverter.toModel();
		model.role = WorkroleUtilConverter.toModel();
		model.nation = NationUtilConverter.toModel();
		model.city = CityUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): WorkexperienceDTO {
		const dto = new WorkexperienceDTO();
		dto.company_fk = ActivityUtilConverter.toDto();
		dto.role_fk = WorkroleUtilConverter.toDto();
		dto.nation_fk = NationUtilConverter.toDto();
		dto.city_fk = CityUtilConverter.toDto();
		return dto;
	}
}

export class WorkexperienceUtilConverter {
	static toDto(model?: WorkexperienceModel) {
		const converter = new WorkexperienceConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: WorkexperienceDTO) {
		const converter = new WorkexperienceConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: WorkexperienceModel[]) {
		const converter = new WorkexperienceConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: WorkexperienceDTO[]) {
		const converter = new WorkexperienceConverter();
		return converter.convertToModelList(dtos);
	}
}
