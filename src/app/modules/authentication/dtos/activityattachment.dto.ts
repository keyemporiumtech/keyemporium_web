import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from './activity.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';

export class ActivityattachmentDTO extends ApiDTO {
	public cod: string;
	public flgprincipal: number; // boolean
	public activity: string;
	public activity_fk: ActivityDTO;
	public attachment: string;
	public attachment_fk: AttachmentDTO;
	public tpattachment: string;
	public tpattachment_fk: TypologicalDTO;
	public group: string;
}
