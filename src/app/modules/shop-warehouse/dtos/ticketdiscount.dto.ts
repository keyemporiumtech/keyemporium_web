import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { TicketDTO } from './ticket.dto';
import { DiscountDTO } from './discount.dto';

export class TicketdiscountDTO extends ApiDTO {
	public cod: string;
	public ticket: string;
	public ticket_fk: TicketDTO;
	public discount: string;
	public discount_fk: DiscountDTO;
}
