import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PocketDTO } from './pocket.dto';
import { ProductDTO } from './product.dto';

export class PocketproductDTO extends ApiDTO {
	public cod: string;
	public pocket: string;
	public pocket_fk: PocketDTO;
	public product: string;
	public product_fk: ProductDTO;
}
