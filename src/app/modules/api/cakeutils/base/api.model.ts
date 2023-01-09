import { BaseModel, DateModel } from '@ddc/kit';

export class ApiModel extends BaseModel {
	created: string; // date
	modified: string; // date
	grouprelation_cod: string[];
	grouprelation_groupcod: string[];

	public get createdModel(): DateModel {
		return new DateModel(this.created);
	}
	public get createdFormat(): string {
		const dateModel = new DateModel(this.created);
		return dateModel.toString();
	}
	public get modifiedModel(): DateModel {
		return new DateModel(this.modified);
	}
	public get modifiedFormat(): string {
		const dateModel = new DateModel(this.modified);
		return dateModel.toString();
	}
}
