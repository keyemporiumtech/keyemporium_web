import { ApiDTO } from '../../cakeutils/base/api.dto';

export class GroupDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public description: string;
	public symbol: string;
	public flgused: number; // boolean
}
