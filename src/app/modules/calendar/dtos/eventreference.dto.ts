import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ContactreferenceDTO } from '../../authentication/dtos/contactreference.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { EventDTO } from './event.dto';

export class EventreferenceDTO extends ApiDTO {
	public cod: string;
	public flgprincipal: number;
	public contactreference: string;
	public contactreference_fk: ContactreferenceDTO;
	public tpcontactreference: string;
	public tpcontactreference_fk: TypologicalDTO;
	public event: string;
	public event_fk: EventDTO;
}
