import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PhoneDTO } from './phone.dto';

export class PhonereceiverDTO extends ApiDTO {
	public phone: string;
	public phone_fk: PhoneDTO;
	public receivername: string;
	public receiverphone: string;
	public flgreaded: number; // boolean
	public dtaread: string; // date
	public dtareceive: string; // date
}
