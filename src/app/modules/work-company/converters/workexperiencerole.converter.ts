import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { WorkexperienceroleDTO } from '../dtos/workexperiencerole.dto';
import { WorkexperienceModel } from '../models/workexperience.model';
import { WorkexperienceroleModel } from '../models/workexperiencerole.model';
import { WorkroleModel } from '../models/workrole.model';
import { WorkexperienceConverter, WorkexperienceUtilConverter } from './workexperience.converter';
import { WorkroleConverter, WorkroleUtilConverter } from './workrole.converter';

export class WorkexperienceroleConverter extends BaseApiConverter<
	WorkexperienceroleModel,
	WorkexperienceroleDTO
> {
	public convertToModel(dto?: WorkexperienceroleDTO): WorkexperienceroleModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new WorkexperienceroleModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.gg = dto.gg;
		model.months = dto.months;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('role', 'role_fk', new WorkroleConverter()),
			new WorkroleModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('experience', 'experience_fk', new WorkexperienceConverter()),
			new WorkexperienceModel(),
		);

		return model;
	}
	public convertToDto(model?: WorkexperienceroleModel): WorkexperienceroleDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new WorkexperienceroleDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.gg = model.gg;
		dto.months = model.months;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('role', 'role_fk', new WorkroleConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('experience', 'experience_fk', new WorkexperienceConverter()),
		);
		return dto;
	}
	public getEmptyModel(): WorkexperienceroleModel {
		const model = new WorkexperienceroleModel();
		model.role = WorkroleUtilConverter.toModel();
		model.experience = WorkexperienceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): WorkexperienceroleDTO {
		const dto = new WorkexperienceroleDTO();
		dto.role_fk = WorkroleUtilConverter.toDto();
		dto.experience_fk = WorkexperienceUtilConverter.toDto();
		return dto;
	}
}

export class WorkexperienceroleUtilConverter {
	static toDto(model?: WorkexperienceroleModel) {
		const converter = new WorkexperienceroleConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: WorkexperienceroleDTO) {
		const converter = new WorkexperienceroleConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: WorkexperienceroleModel[]) {
		const converter = new WorkexperienceroleConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: WorkexperienceroleDTO[]) {
		const converter = new WorkexperienceroleConverter();
		return converter.convertToModelList(dtos);
	}
}
