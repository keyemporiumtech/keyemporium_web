import { BaseModel, DateModel } from '@ddc/kit';

export class ProvaPaginationModel extends BaseModel {
	constructor(public codice: string, public numero: number, public data: string) {
		super();
	}

	get dataFormat(): string {
		const dta = new DateModel(this.data);
		return dta.toString('DD/MM/YYYY');
	}
}
