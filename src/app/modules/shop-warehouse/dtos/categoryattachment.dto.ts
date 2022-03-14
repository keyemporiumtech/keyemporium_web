import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { CategoryDTO } from './category.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';

export class CategoryattachmentDTO extends ApiDTO {
	public cod: string;
	public category: string;
	public category_fk: CategoryDTO;
	public attachment: string;
	public attachment_fk: AttachmentDTO;
}
