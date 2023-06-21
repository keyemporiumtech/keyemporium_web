import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class Authentication2faDTO extends ApiDTO {
	public lastCod: string;
	public lastTime: string; // date
	public key: string;
	public timeWait: number;
}
