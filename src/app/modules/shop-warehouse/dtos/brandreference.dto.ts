import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { BrandDTO } from './brand.dto';
import { ContactreferenceDTO } from '../../authentication/dtos/contactreference.dto';

export class BrandreferenceDTO extends ApiDTO {
	public cod: string;
	public brand: string;
	public brand_fk: BrandDTO;
	public contactreference: string;
	public contactreference_fk: ContactreferenceDTO;
}
