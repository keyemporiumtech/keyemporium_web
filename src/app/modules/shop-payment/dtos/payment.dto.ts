import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PriceDTO } from '../../shop-warehouse/dtos/price.dto';
import { PaymentmethodDTO } from './paymentmethod.dto';
import { UserDTO } from '../../authentication/dtos/user.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';

export class PaymentDTO extends ApiDTO {
	public cod: string;
	public price: string;
	public price_fk: PriceDTO;
	public flgin: number;
	public paymentmethod: string;
	public paymentmethod_fk: PaymentmethodDTO;
	public dtapayment: string;
	public note: string;
	public causal: string;
	public bank_sender: string;
	public bank_receiver: string;
	public flgconfirm: number;
	public user: string;
	public user_fk: UserDTO;
	public tppayment: string;
	public tppayment_fk: TypologicalDTO;
}
