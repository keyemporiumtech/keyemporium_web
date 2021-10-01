import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { CreditcardRequestDTO } from './creditcard-request.dto';

export class CreditcardDTO extends ApiDTO {
	public input: CreditcardRequestDTO;
	public pattern: string;
	public format: string;
	public length: number;
	public cvcLength: number;
	public luhn: string;
	public type: string;
}
