import { BaseDTO } from '@ddc/kit';

export class ApiDTO extends BaseDTO {
	created: string; // date
	modified: string; // date
	grouprelation_cod?: string[];
	grouprelation_groupcod?: string[];
}
