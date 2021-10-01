import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { MailDTO } from './mail.dto';

export class MailreceiverDTO extends ApiDTO {
	public mail: string;
	public mail_fk: MailDTO;
	public receivername: string;
	public receiveremail: string;
	public flgcc: number; // boolean
	public flgccn: number; // boolean
	public flgreaded: number; // boolean
	public dtaread: string; // date
	public dtareceive: string; // date
}
