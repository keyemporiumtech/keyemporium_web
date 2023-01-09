import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ProductDTO } from './product.dto';
import { ReservationsettingDTO } from './reservationsetting.dto';

export class ProductreservesettingDTO extends ApiDTO {
	public cod: string;
	public product: string;
	public product_fk: ProductDTO;
	public settings: string;
	public settings_fk: ReservationsettingDTO;
}
