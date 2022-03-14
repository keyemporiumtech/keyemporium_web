import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PriceDTO } from './price.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';

export class PocketDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public description: string;
	public image: string;
	public image_fk: AttachmentDTO;
	public price: string;
	public price_fk: PriceDTO;
	public note: string;
	public flgreleted: number;
	public flgdeleted: number;
}
