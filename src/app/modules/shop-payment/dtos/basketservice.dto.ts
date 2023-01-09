import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ServiceDTO } from '../../shop-warehouse/dtos/service.dto';
import { BasketDTO } from './basket.dto';

export class BasketserviceDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public service: string;
	public service_fk: ServiceDTO;
	public basket: string;
	public basket_fk: BasketDTO;
}
