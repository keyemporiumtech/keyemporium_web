import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';
import { CategoryDTO } from './category.dto';
import { PriceDTO } from './price.dto';
import { EventDTO } from '../../calendar/dtos/event.dto';

export class TicketDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public description: string;
	public image: string;
	public image_fk: AttachmentDTO;
	public quantity: number;
	public event: string;
	public event_fk: EventDTO;
	public category: string;
	public category_fk: CategoryDTO;
	public price: string;
	public price_fk: PriceDTO;
	public note: string;
	public dtafrom: string;
	public dtato: string;
	public flgdeleted: number;
	public flgwarehouse: number;
	public flgreserve: number;
}
