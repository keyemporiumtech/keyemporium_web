import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PocketDTO } from './pocket.dto';
import { ReservationsettingDTO } from './reservationsetting.dto';

export class PocketreservesettingDTO extends ApiDTO {
	public cod: string;
	public pocket: string;
	public pocket_fk: PocketDTO;
	public settings: string;
	public settings_fk: ReservationsettingDTO;
}
