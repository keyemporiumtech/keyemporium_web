import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import {
	WorkroleConverter,
	WorkroleUtilConverter,
} from '../../work-company/converters/workrole.converter';
import { WorkroleModel } from '../../work-company/models/workrole.model';
import { ProfessionroleDTO } from '../dtos/professionrole.dto';
import { ProfessionModel } from '../models/profession.model';
import { ProfessionroleModel } from '../models/professionrole.model';
import { ProfessionConverter, ProfessionUtilConverter } from './profession.converter';

export class ProfessionroleConverter extends BaseApiConverter<
	ProfessionroleModel,
	ProfessionroleDTO
> {
	public convertToModel(dto?: ProfessionroleDTO): ProfessionroleModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new ProfessionroleModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.gg = dto.gg;
		model.months = dto.months;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('profession', 'profession_fk', new ProfessionConverter()),
			new ProfessionModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('role', 'role_fk', new WorkroleConverter()),
			new WorkroleModel(),
		);
		return model;
	}
	public convertToDto(model?: ProfessionroleModel): ProfessionroleDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new ProfessionroleDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.gg = model.gg;
		dto.months = model.months;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('profession', 'profession_fk', new ProfessionConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('role', 'role_fk', new WorkroleConverter()),
		);
		return dto;
	}
	public getEmptyModel(): ProfessionroleModel {
		const model = new ProfessionroleModel();
		model.profession = ProfessionUtilConverter.toModel();
		model.role = WorkroleUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): ProfessionroleDTO {
		const dto = new ProfessionroleDTO();
		dto.profession_fk = ProfessionUtilConverter.toDto();
		dto.role_fk = WorkroleUtilConverter.toDto();
		return dto;
	}
}

export class ProfessionroleUtilConverter {
	static toDto(model?: ProfessionroleModel) {
		const converter = new ProfessionroleConverter();
		return converter.convertToDto(model);
	}

	static toModel(dto?: ProfessionroleDTO) {
		const converter = new ProfessionroleConverter();
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: ProfessionroleModel[]) {
		const converter = new ProfessionroleConverter();
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: ProfessionroleDTO[]) {
		const converter = new ProfessionroleConverter();
		return converter.convertToModelList(dtos);
	}
}
