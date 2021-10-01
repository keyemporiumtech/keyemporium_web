import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';
import { MailDTO } from './mail.dto';

export class MailcidDTO extends ApiDTO {
	public cid: string;
	public mail: string;
	public mail_fk: MailDTO;
	public attachment: string;
	public attachment_fk: AttachmentDTO;
}
