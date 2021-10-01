import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class MailerDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public host: string;
	public port: string;
	public username: string;
	public password: string;
	public sendername: string;
	public senderemail: string;
	public crypttype: string;
}
