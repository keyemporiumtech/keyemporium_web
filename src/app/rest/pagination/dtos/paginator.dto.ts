import { BaseDTO } from '@ddc/kit';

export class PaginatorDTO extends BaseDTO {
	public list: any[];
	public pages: number;
	public count: number;
}
