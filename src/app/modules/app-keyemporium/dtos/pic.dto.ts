import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';
import { AddressDTO } from '../../localesystem/dtos/address.dto';
import { ContactreferenceDTO } from '../../authentication/dtos/contactreference.dto';
import { ProfessionDTO } from '../../work-cv/dtos/profession.dto';

export class PicDTO extends ApiDTO {
	public id_user: string;
	public cf: string;
	public image: AttachmentDTO;
	public home: AddressDTO;
	public email: ContactreferenceDTO;
	public phone: ContactreferenceDTO;
	public website: ContactreferenceDTO;
	public professions: ProfessionDTO[];
}
