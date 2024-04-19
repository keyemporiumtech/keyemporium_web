import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { TicketDTO } from '../../shop-warehouse/dtos/ticket.dto';
import { BasketDTO } from './basket.dto';

export class BasketticketDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public ticket: string;
	public ticket_fk: TicketDTO;
	public quantity: number;
	public basket: string;
	public basket_fk: BasketDTO;
	public dtainit: string;
	public dtaend: string;
}
