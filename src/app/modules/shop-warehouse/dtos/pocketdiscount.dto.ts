import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PocketDTO } from './pocket.dto';
import { DiscountDTO } from './discount.dto';

export class PocketdiscountDTO extends ApiDTO {
	public cod: string;
	public pocket: string;
	public pocket_fk: PocketDTO;
	public discount: string;
	public discount_fk: DiscountDTO;
}
