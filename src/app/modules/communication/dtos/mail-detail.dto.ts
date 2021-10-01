import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';
import { MailDTO } from './mail.dto';
import { MailreceiverDTO } from './mailreceiver.dto';

export class MailDetailDTO extends ApiDTO {
	public mail: MailDTO;
	public destinators: MailreceiverDTO[];
	public cc: MailreceiverDTO[];
	public ccn: MailreceiverDTO[];
	public attachments: AttachmentDTO[];
	public cids: AttachmentDTO[];
	public body: string;
	public html: string;
}
