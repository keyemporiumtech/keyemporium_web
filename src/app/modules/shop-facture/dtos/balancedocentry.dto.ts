import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PriceDTO } from '../../shop-warehouse/dtos/price.dto';
import { BalancedocDTO } from './balancedoc.dto';

export class BalancedocentryDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public description: string;
	public quantity: number;
	public dtainit: string;
	public dtaend: string;
	public price: string;
	public price_fk: PriceDTO;
	public balancedoc: string;
	public balancedoc_fk: BalancedocDTO;
}
