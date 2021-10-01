import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from '../../authentication/dtos/user.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';
import { AddressDTO } from '../../localesystem/dtos/address.dto';
import { ContactreferenceDTO } from '../../authentication/dtos/contactreference.dto';

export class WorkuserDTO extends ApiDTO {
	public cod: string;
	public user: string;
	public user_fk: UserDTO;
	public image: string;
	public image_fk: AttachmentDTO;
	public home: string;
	public home_fk: AddressDTO;
	public email: string;
	public email_fk: ContactreferenceDTO;
	public phone: string;
	public phone_fk: ContactreferenceDTO;
	public website: string;
	public website_fk: ContactreferenceDTO;
}
