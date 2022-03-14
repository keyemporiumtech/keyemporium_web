import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { BrandDTO } from './brand.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';

export class BrandattachmentDTO extends ApiDTO {
	public cod: string;
	public brand: string;
	public brand_fk: BrandDTO;
	public attachment: string;
	public attachment_fk: AttachmentDTO;
}
