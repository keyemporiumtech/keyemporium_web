import { BaseApiConverter } from '../../api/cakeutils/base/base-api.converter';
import { PocketserviceModel } from '../models/pocketservice.model';
import { PocketserviceDTO } from '../dtos/pocketservice.dto';
import { PocketConverter, PocketUtilConverter } from './pocket.converter';
import { PocketModel } from '../models/pocket.model';
import { ServiceConverter, ServiceUtilConverter } from './service.converter';
import { ServiceModel } from '../models/service.model';

export class PocketserviceConverter extends BaseApiConverter<PocketserviceModel, PocketserviceDTO> {
	public convertToModel(dto?: PocketserviceDTO): PocketserviceModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new PocketserviceModel();
		this.convertCommonPropertiesToModel(dto, model);
		model.cod = dto.cod;
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('pocket', 'pocket_fk', new PocketConverter()),
			new PocketModel(),
		);
		this.convertForeignKeyToModel(
			dto,
			model,
			this.getPropertyForFk('service', 'service_fk', new ServiceConverter()),
			new ServiceModel(),
		);
		return model;
	}
	public convertToDto(model?: PocketserviceModel): PocketserviceDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PocketserviceDTO();
		this.convertCommonPropertiesToDto(dto, model);
		dto.cod = model.cod;
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('pocket', 'pocket_fk', new PocketConverter()),
		);
		this.convertForeignKeyToDto(
			dto,
			model,
			this.getPropertyForFk('service', 'service_fk', new ServiceConverter()),
		);
		return dto;
	}
	public getEmptyModel(): PocketserviceModel {
		const model = new PocketserviceModel();
		model.pocket = PocketUtilConverter.toModel();
		model.service = ServiceUtilConverter.toModel();
		return model;
	}
	public getEmptyDto(): PocketserviceDTO {
		const dto = new PocketserviceDTO();
		dto.pocket_fk = PocketUtilConverter.toDto();
		dto.service_fk = ServiceUtilConverter.toDto();
		return dto;
	}
}

export class PocketserviceUtilConverter {
	static toDto(model?: PocketserviceModel) {
		const converter = new PocketserviceConverter();
		return converter.convertToDto(model);
	}
	static toModel(dto?: PocketserviceDTO) {
		const converter = new PocketserviceConverter();
		return converter.convertToModel(dto);
	}
	static toDtoList(models?: PocketserviceModel[]) {
		const converter = new PocketserviceConverter();
		return converter.convertToDtoList(models);
	}
	static toModelList(dtos?: PocketserviceDTO[]) {
		const converter = new PocketserviceConverter();
		return converter.convertToModelList(dtos);
	}
}
