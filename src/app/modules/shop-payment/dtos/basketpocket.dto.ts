import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PocketDTO } from '../../shop-warehouse/dtos/pocket.dto';
import { BasketDTO } from './basket.dto';

export class BasketpocketDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public pocket: string;
	public pocket_fk: PocketDTO;
	public quantity: number;
	public basket: string;
	public basket_fk: BasketDTO;
	public dtainit: string;
	public dtaend: string;
}
