import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class ReservationsettingDTO extends ApiDTO {
	public cod: string;
	public dailyweeks: string;
	public dailymonths: string;
	public hhreservefrom: string;
	public hhreserveto: string;
	public dtafrom: string;
	public dtato: string;
}
