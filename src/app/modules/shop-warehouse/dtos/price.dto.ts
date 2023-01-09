import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { CurrencyDTO } from '../../util-currency/dtos/currency.dto';

export class PriceDTO extends ApiDTO {
	public cod: string;
	public price: number;
	public total: number;
	public iva: number;
	public iva_percent: number;
	public discount: number;
	public discount_percent: number;
	public tax: number;
	public currencyid: string;
	public currency_fk: CurrencyDTO;
	public totalsum: number;
}
