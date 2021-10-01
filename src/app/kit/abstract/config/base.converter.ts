import { BaseModel } from './base.model';
import { BaseDTO } from './base.dto';

export abstract class BaseConverter<M extends BaseModel, D extends BaseDTO> {
	constructor() {}

	public abstract convertToModel(dto?: D): M;

	public abstract convertToDto(model?: M): D;

	public abstract getEmptyModel(): M;

	public abstract getEmptyDto(): D;

	public convertToModelList(dtoArray?: D[]): M[] {
		if (!dtoArray || !dtoArray.length) {
			return this.getEmptyModelList();
		}
		const array: M[] = [];
		for (const dto of dtoArray) {
			if (dto != null && dto !== undefined) {
				array.push(this.convertToModel(dto));
			}
		}
		return array;
	}

	public convertToDtoList(modelArray?: M[], light?: boolean): D[] {
		if (!modelArray || !modelArray.length) {
			return this.getEmptyDtoList();
		}
		const array: any = [];
		for (const model of modelArray) {
			if (model != null && model !== undefined) {
				if (light) {
					array.push({ id: model.id });
				} else {
					array.push(this.convertToDto(model));
				}
			}
		}

		return array;
	}

	public getEmptyModelList(): M[] {
		const arr: M[] = [];
		// arr.push(this.getEmptyModel());
		return arr;
	}

	public getEmptyDtoList(): D[] {
		const arr: D[] = [];
		// arr.push(this.getEmptyDto());
		return arr;
	}
}
