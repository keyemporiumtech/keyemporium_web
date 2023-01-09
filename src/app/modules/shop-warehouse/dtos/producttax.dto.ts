import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ProductDTO } from './product.dto';
import { CurrencyDTO } from '../../util-currency/dtos/currency.dto';

export class ProducttaxDTO extends ApiDTO {
	public cod: string;
	public product: string;
	public product_fk: ProductDTO;
	public tax: number;
	public tax_percent: number;
	public taxdescription: string;
	public currencyid: string;
	public currency_fk: CurrencyDTO;
}
