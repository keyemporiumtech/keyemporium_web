import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { TicketDTO } from './ticket.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';

export class TicketattachmentDTO extends ApiDTO {
	public cod: string;
	public ticket: string;
	public ticket_fk: TicketDTO;
	public attachment: string;
	public attachment_fk: AttachmentDTO;
}
