import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class MailDTO extends ApiDTO {
	public ipname: string;
	public subject: string;
	public sendername: string;
	public senderemail: string;
	public message: string;
	public flgdeleted: number; // boolean
	public dtasend: string; // date
}
