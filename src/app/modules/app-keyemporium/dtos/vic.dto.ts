import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';
import { AddressDTO } from '../../localesystem/dtos/address.dto';
import { ContactreferenceDTO } from '../../authentication/dtos/contactreference.dto';

export class VicDTO extends ApiDTO {
	public id_user: string;
	public image: AttachmentDTO;
	public images: AttachmentDTO[];
	public attachments: AttachmentDTO[];
	public name: string;
	public surname: string;
	public sex: string;
	public born: string;
	public home: AddressDTO;
	public addresses: AddressDTO[];
	public email: ContactreferenceDTO;
	public emails: ContactreferenceDTO[];
	public phone: ContactreferenceDTO;
	public phones: ContactreferenceDTO[];
	public link: ContactreferenceDTO;
	public links: ContactreferenceDTO[];
}
