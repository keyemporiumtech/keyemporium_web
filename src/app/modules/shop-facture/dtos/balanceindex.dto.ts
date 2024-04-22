import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { BalanceDTO } from '../../shop-payment/dtos/balance.dto';

export class BalanceindexDTO extends ApiDTO {
	public cod: string;
	public tpbalancedoc: string;
	public tpbalancedoc_fk: TypologicalDTO;
	public val: string;
	public balance: string;
	public balance_fk: BalanceDTO;
	public year: number;
	public format: string;
}
