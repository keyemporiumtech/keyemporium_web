import { PaymentDTO } from './payment.dto';
import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class BalanceFlowDTO extends ApiDTO {
	public priceIn: number;
	public priceOut: number;
	public ivaIn: number;
	public ivaOut: number;
	public discountIn: number;
	public discountOut: number;
	public taxIn: number;
	public taxOut: number;
	public totalIn: number;
	public totalOut: number;
	public totalsumIn: number;
	public totalsumOut: number;
	public currencyCod: string;
	public currencyTitle: string;
	public currencySymbol: string;
	public currencyIcon: string;
	public deposit: number;
	public payed: number;
	public payments: PaymentDTO[];
	public pages: number;
	public count: number;
}
