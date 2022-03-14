import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PocketDTO } from './pocket.dto';
import { ServiceDTO } from './service.dto';

export class PocketserviceDTO extends ApiDTO {
	public cod: string;
	public pocket: string;
	public pocket_fk: PocketDTO;
	public service: string;
	public service_fk: ServiceDTO;
}
