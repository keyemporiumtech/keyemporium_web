import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PocketDTO } from './pocket.dto';
import { CurrencyDTO } from '../../util-currency/dtos/currency.dto';

export class PockettaxDTO extends ApiDTO {
	public cod: string;
	public pocket: string;
	public pocket_fk: PocketDTO;
	public tax: number;
	public tax_percent: number;
	public taxdescription: string;
	public currencyid: string;
	public currency_fk: CurrencyDTO;
}
