import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ProductDTO } from './product.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';

export class ProductattachmentDTO extends ApiDTO {
	public cod: string;
	public product: string;
	public product_fk: ProductDTO;
	public attachment: string;
	public attachment_fk: AttachmentDTO;
}
