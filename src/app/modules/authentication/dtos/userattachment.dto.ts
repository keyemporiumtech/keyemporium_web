import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from './user.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';

export class UserattachmentDTO extends ApiDTO {
	public cod: string;
	public flgprincipal: number; // boolean
	public user: string;
	public user_fk: UserDTO;
	public attachment: string;
	public attachment_fk: AttachmentDTO;
	public tpattachment: string;
	public tpattachment_fk: TypologicalDTO;
	public group: string;
}
