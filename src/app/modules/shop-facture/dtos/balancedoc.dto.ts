import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { BalanceDTO } from '../../shop-payment/dtos/balance.dto';
import { BasketDTO } from '../../shop-payment/dtos/basket.dto';
import { PriceDTO } from '../../shop-warehouse/dtos/price.dto';
import { CurrencyDTO } from '../../util-currency/dtos/currency.dto';
import { DocactorDTO } from './docactor.dto';

export class BalancedocDTO extends ApiDTO {
	public cod: string;
	public actorsender: string;
	public actorsender_fk: DocactorDTO;
	public actorreceiver: string;
	public actorreceiver_fk: DocactorDTO;
	public causal: string;
	public bank: string;
	public price: string;
	public price_fk: PriceDTO;
	public deposit: number;
	public payed: number;
	public dtainit: string;
	public dtaend: string;
	public tpbalancedoc: string;
	public tpbalancedoc_fk: TypologicalDTO;
	public associated: string;
	public associated_fk: BalancedocDTO;
	public payclose: number;
	public balance: string;
	public balance_fk: BalanceDTO;
	public flgtotalbyentry: number;
	public flgin: number;
	public currencyid: string;
	public currency_fk: CurrencyDTO;
	public basket: string;
	public basket_fk: BasketDTO;
}
