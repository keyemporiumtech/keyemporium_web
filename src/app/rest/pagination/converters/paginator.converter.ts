import { PaginatorDTO } from '../dtos/paginator.dto';
import { PaginatorModel } from '../models/paginator.model';
import { BaseConverter } from '@ddc/kit';

export class PaginatorConverter extends BaseConverter<PaginatorModel, PaginatorDTO> {
	converterList: BaseConverter<any, any>;

	constructor(converterModelList: BaseConverter<any, any>) {
		super();
		this.converterList = converterModelList;
	}
	convertToModel(dto?: PaginatorDTO): PaginatorModel {
		if (!dto) {
			return this.getEmptyModel();
		}
		const model = new PaginatorModel();
		model.id = dto.id;
		model.list = this.converterList.convertToModelList(dto.list);
		model.pages = dto.pages;
		model.count = dto.count;
		return model;
	}
	convertToDto(model?: PaginatorModel): PaginatorDTO {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto = new PaginatorDTO();
		dto.id = model.id;
		dto.list = this.converterList.convertToDtoList(model.list);
		dto.pages = model.pages;
		dto.count = model.count;
		return dto;
	}

	getEmptyModel(): PaginatorModel {
		const model = new PaginatorModel();
		return model;
	}

	getEmptyDto(): PaginatorDTO {
		const dto = new PaginatorDTO();
		return dto;
	}
}

export class PaginatorUtilConverter {
	static toDto(model?: PaginatorModel, converterModelList?: BaseConverter<any, any>) {
		const converter = new PaginatorConverter(converterModelList);
		return converter.convertToDto(model);
	}

	static toModel(dto?: PaginatorDTO, converterModelList?: BaseConverter<any, any>) {
		const converter = new PaginatorConverter(converterModelList);
		return converter.convertToModel(dto);
	}

	static toDtoList(models?: PaginatorModel[], converterModelList?: BaseConverter<any, any>) {
		const converter = new PaginatorConverter(converterModelList);
		return converter.convertToDtoList(models);
	}

	static toModelList(dtos?: PaginatorDTO[], converterModelList?: BaseConverter<any, any>) {
		const converter = new PaginatorConverter(converterModelList);
		return converter.convertToModelList(dtos);
	}
}
