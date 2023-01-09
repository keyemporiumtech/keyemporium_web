import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { BalanceDTO } from './balance.dto';
import { PaymentDTO } from './payment.dto';

export class BalancepaymentDTO extends ApiDTO {
	public cod: string;
	public balance: string;
	public balance_fk: BalanceDTO;
	public payment: string;
	public payment_fk: PaymentDTO;
}
