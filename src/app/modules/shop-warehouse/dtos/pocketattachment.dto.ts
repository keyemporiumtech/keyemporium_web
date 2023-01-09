import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PocketDTO } from './pocket.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';

export class PocketattachmentDTO extends ApiDTO {
	public cod: string;
	public pocket: string;
	public pocket_fk: PocketDTO;
	public attachment: string;
	public attachment_fk: AttachmentDTO;
}
