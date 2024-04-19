import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ProductDTO } from '../../shop-warehouse/dtos/product.dto';
import { BasketDTO } from './basket.dto';

export class BasketproductDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public product: string;
	public product_fk: ProductDTO;
	public quantity: number;
	public basket: string;
	public basket_fk: BasketDTO;
	public dtainit: string;
	public dtaend: string;
}
