import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { TicketDTO } from './ticket.dto';
import { ReservationsettingDTO } from './reservationsetting.dto';

export class TicketreservesettingDTO extends ApiDTO {
	public cod: string;
	public ticket: string;
	public ticket_fk: TicketDTO;
	public settings: string;
	public settings_fk: ReservationsettingDTO;
}
