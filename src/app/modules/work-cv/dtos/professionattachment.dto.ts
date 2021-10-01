import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';
import { ProfessionDTO } from './profession.dto';

export class ProfessionattachmentDTO extends ApiDTO {
	public cod: string;
	public profession: string;
	public profession_fk: ProfessionDTO;
	public attachment: string;
	public attachment_fk: AttachmentDTO;
}
