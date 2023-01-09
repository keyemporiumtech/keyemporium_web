import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { TicketDTO } from './ticket.dto';
import { CurrencyDTO } from '../../util-currency/dtos/currency.dto';

export class TickettaxDTO extends ApiDTO {
	public cod: string;
	public ticket: string;
	public ticket_fk: TicketDTO;
	public tax: number;
	public tax_percent: number;
	public taxdescription: string;
	public currencyid: string;
	public currency_fk: CurrencyDTO;
}
