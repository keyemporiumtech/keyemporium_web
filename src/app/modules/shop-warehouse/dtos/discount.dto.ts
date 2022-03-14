import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { CurrencyDTO } from '../../util-currency/dtos/currency.dto';

export class DiscountDTO extends ApiDTO {
	public cod: string;
	public discount: number;
	public discount_percent: number;
	public description: string;
	public levelquantity: number;
	public levelprice: number;
	public dtainit: string;
	public dtaend: string;
	public flgsystem: number;
	public flglevelbasket: number;
	public currencyid: string;
	public currency_fk: CurrencyDTO;
}
