import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from '../../authentication/dtos/activity.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';
import { AddressDTO } from '../../localesystem/dtos/address.dto';
import { ContactreferenceDTO } from '../../authentication/dtos/contactreference.dto';

export class WorkactivityDTO extends ApiDTO {
	public cod: string;
	public activity: string;
	public activity_fk: ActivityDTO;
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
