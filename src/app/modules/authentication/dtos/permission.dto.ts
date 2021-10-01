import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class PermissionDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public description: string;
}
