import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class MimetypeDTO extends ApiDTO {
	public ext: string;
	public value: string;
	public type: string;
}
