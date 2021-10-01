import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class ProfileDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public description: string;
}
