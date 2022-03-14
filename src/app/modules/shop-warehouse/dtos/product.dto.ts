import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';
import { BrandDTO } from './brand.dto';
import { CategoryDTO } from './category.dto';
import { PriceDTO } from './price.dto';

export class ProductDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public description: string;
	public image: string;
	public image_fk: AttachmentDTO;
	public quantity: number;
	public brand: string;
	public brand_fk: BrandDTO;
	public category: string;
	public category_fk: CategoryDTO;
	public price: string;
	public price_fk: PriceDTO;
	public note: string;
	public weight: number;
	public width: number;
	public height: number;
	public flgdeleted: number;
	public flgwarehouse: number;
	public flgreserve: number;
}
