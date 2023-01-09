import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ServiceDTO } from './service.dto';
import { DiscountDTO } from './discount.dto';

export class ServicediscountDTO extends ApiDTO {
	public cod: string;
	public service: string;
	public service_fk: ServiceDTO;
	public discount: string;
	public discount_fk: DiscountDTO;
}
