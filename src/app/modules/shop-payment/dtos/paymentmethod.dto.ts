import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { UserDTO } from '../../authentication/dtos/user.dto';
import { ActivityDTO } from '../../authentication/dtos/activity.dto';

export class PaymentmethodDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public intest: string;
	public description: string;
	public tppaymentmethod: string;
	public tppaymentmethod_fk: TypologicalDTO;
	public tpwebpayment: string;
	public tpwebpayment_fk: TypologicalDTO;
	public user: string;
	public user_fk: UserDTO;
	public activity: string;
	public activity_fk: ActivityDTO;
	public email: string;
	public account_id: string;
	public iban: string;
	public bban: string;
	public swift_bic: string;
	public swift: string;
	public bic: string;
	public abi: string;
	public cab: string;
	public cin: string;
	public bank: string;
	public bank_address: string;
	public cc: string;
	public card: string;
	public card_number: string;
	public card_deadline_m: string;
	public card_deadline_y: string;
	public cvv: string;
	public cvv2: string;
	public cvc: string;
	public typein: number;
	public typeout: number;
	public flgonline: number;
	public flgdefault: number;
	public signin: string;
	public signout: string;
}