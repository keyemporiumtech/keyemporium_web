import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PaymentDTO } from '../../shop-payment/dtos/payment.dto';
import { BalancedocDTO } from './balancedoc.dto';

export class BalancedocpaymentDTO extends ApiDTO {
	public cod: string;
	public balancedoc: string;
	public balancedoc_fk: BalancedocDTO;
	public payment: string;
	public payment_fk: PaymentDTO;
}
