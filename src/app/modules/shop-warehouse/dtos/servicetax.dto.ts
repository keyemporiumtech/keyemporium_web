import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ServiceDTO } from './service.dto';
import { CurrencyDTO } from '../../util-currency/dtos/currency.dto';

export class ServicetaxDTO extends ApiDTO {
	public cod: string;
	public service: string;
	public service_fk: ServiceDTO;
	public tax: number;
	public tax_percent: number;
	public taxdescription: string;
	public currencyid: string;
	public currency_fk: CurrencyDTO;
}
