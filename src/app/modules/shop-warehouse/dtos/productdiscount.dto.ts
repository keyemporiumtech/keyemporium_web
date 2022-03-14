import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ProductDTO } from './product.dto';
import { DiscountDTO } from './discount.dto';

export class ProductdiscountDTO extends ApiDTO {
	public cod: string;
	public product: string;
	public product_fk: ProductDTO;
	public discount: string;
	public discount_fk: DiscountDTO;
}
