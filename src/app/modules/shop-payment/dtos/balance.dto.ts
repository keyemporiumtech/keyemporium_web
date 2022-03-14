import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from '../../authentication/dtos/user.dto';
import { ActivityDTO } from '../../authentication/dtos/activity.dto';
import { CurrencyDTO } from '../../util-currency/dtos/currency.dto';

export class BalanceDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public description: string;
	public user: string;
	public user_fk: UserDTO;
	public activity: string;
	public activity_fk: ActivityDTO;
	public initdeposit: number;
	public currencyid: string;
	public currency_fk: CurrencyDTO;
}
