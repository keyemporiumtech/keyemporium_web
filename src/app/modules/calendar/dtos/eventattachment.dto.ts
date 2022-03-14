import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';
import { EventDTO } from './event.dto';

export class EventattachmentDTO extends ApiDTO {
	public cod: string;
	public flgprincipal: number; // boolean
	public attachment: string;
	public attachment_fk: AttachmentDTO;
	public tpattachment: string;
	public tpattachment_fk: TypologicalDTO;
	public event: string;
	public event_fk: EventDTO;
}
