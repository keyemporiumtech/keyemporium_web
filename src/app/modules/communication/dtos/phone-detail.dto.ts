import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PhoneDTO } from './phone.dto';
import { PhonereceiverDTO } from './phonereceiver.dto';

export class PhoneDetailDTO extends ApiDTO {
	public phone: PhoneDTO;
	public destinators: PhonereceiverDTO[];
	public body: string;
	public html: string;
}
