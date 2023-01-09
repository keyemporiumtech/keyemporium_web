import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';

export class CategoryDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public description: string;
	public image: string;
	public image_fk: AttachmentDTO;
	public parent_id: string;
	public parent_fk: CategoryDTO;
	public lft: number;
	public rght: number;
	public reftable: string;
}
