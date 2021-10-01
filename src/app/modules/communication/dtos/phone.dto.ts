import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class PhoneDTO extends ApiDTO {
	public sendername: string;
	public senderphone: string;
	public message: string;
	public flgdeleted: number; // boolean
	public dtasend: string; // date
}
