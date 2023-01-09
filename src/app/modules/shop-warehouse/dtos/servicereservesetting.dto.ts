import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ServiceDTO } from './service.dto';
import { ReservationsettingDTO } from './reservationsetting.dto';

export class ServicereservesettingDTO extends ApiDTO {
	public cod: string;
	public service: string;
	public service_fk: ServiceDTO;
	public settings: string;
	public settings_fk: ReservationsettingDTO;
}
