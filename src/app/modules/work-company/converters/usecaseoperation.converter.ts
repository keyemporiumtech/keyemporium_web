import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { UsecaseoperationDTO } from '../dtos/usecaseoperation.dto';
import { TaskusecaseModel } from '../models/taskusecase.model';
import { UsecaseoperationModel } from '../models/usecaseoperation.model';
import { TaskusecaseConverter, TaskusecaseUtilConverter } from './taskusecase.converter';

export class UsecaseoperationConverter extends BaseApiConverter<
	UsecaseoperationModel,
	UsecaseoperationDTO
> {
	public convertToModel(dto?: UsecaseoperationDTO): UsecaseoperationModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new UsecaseoperationModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		model.operation = dto.operation;
		model.actorfrom = dto.actorfrom;
		model.actorto = dto.actorto;
		model.start = dto.start;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('usecase', 'usecase_fk', new TaskusecaseConverter()),
			new TaskusecaseModel(),
		);
		return model;
	}
	public convertToDto(model?: UsecaseoperationModel): UsecaseoperationDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new UsecaseoperationDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		dto.operation = model.operation;
		dto.actorfrom = model.actorfrom;
		dto.actorto = model.actorto;
		dto.start = model.start;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('usecase', 'usecase_fk', new TaskusecaseConverter()),
		);
		return dto;
	}
	public getEmptyModel(): UsecaseoperationModel {
		const model = new UsecaseoperationModel();
		model.usecase = TaskusecaseUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): UsecaseoperationDTO {
		const dto = new UsecaseoperationDTO();
		dto.usecase_fk = TaskusecaseUtilConverter.toDto();
		return dto;
	}
}

export class UsecaseoperationUtilConverter {
	static toDto(model?: UsecaseoperationModel) {
		const converter = new UsecaseoperationConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: UsecaseoperationDTO) {
		const converter = new UsecaseoperationConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: UsecaseoperationModel[]) {
		const converter = new UsecaseoperationConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: UsecaseoperationDTO[]) {
		const converter = new UsecaseoperationConverter();
		return converter.convertToModelList(dtos);
	}
}
