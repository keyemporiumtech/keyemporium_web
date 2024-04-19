import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { CurrencyDTO } from '../../util-currency/dtos/currency.dto';
import { BalancedocDTO } from './balancedoc.dto';

export class BalancedoctransportDTO extends ApiDTO {
	public cod: string;
	public company: string;
	public driver: string;
	public packages: number;
	public weight: number;
	public deposit: number;
	public cost: number;
	public packingcost: number;
	public recessedcost: number;
	public balancedoc: string;
	public balancedoc_fk: BalancedocDTO;
	public currencyid: string;
	public currency_fk: CurrencyDTO;
}
