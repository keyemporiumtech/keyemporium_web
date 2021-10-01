import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class CreditcardRequestDTO extends ApiDTO {
	public number: string;
	public expireMM: string;
	public expireYY: string;
	public cvc: string;
	public type: string;
}
