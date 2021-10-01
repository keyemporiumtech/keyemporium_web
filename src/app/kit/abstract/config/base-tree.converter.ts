import { TreeHtmlModel } from '../../tree-html/models/tree-html.model';

export abstract class BaseTreeConverter<D> {
	constructor() {}

	public abstract convertToModel(dto?: D): TreeHtmlModel;

	public abstract convertToDto(model?: TreeHtmlModel): D;

	public abstract getEmptyModel(): TreeHtmlModel;

	public abstract getEmptyDto(): D;

	public convertToModelList(dtoArray?: D[]): TreeHtmlModel[] {
		if (!dtoArray || !dtoArray.length) {
			return this.getEmptyModelList();
		}
		const array: TreeHtmlModel[] = [];
		for (const dto of dtoArray) {
			if (dto != null && dto !== undefined) {
				array.push(this.convertToModel(dto));
			}
		}
		return array;
	}

	public convertToDtoList(modelArray?: TreeHtmlModel[], light?: boolean): D[] {
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

	public getEmptyModelList(): TreeHtmlModel[] {
		const arr: TreeHtmlModel[] = [];
		// arr.push(this.getEmptyModel());
		return arr;
	}

	public getEmptyDtoList(): D[] {
		const arr: D[] = [];
		// arr.push(this.getEmptyDto());
		return arr;
	}
}
