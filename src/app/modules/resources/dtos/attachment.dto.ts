import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class AttachmentDTO extends ApiDTO {
	public url: string;
	public path: string;
	public name: string;
	public cid: string;
	public cod: string;
	public description: string;
	public size: number;
	public ext: string;
	public mimetype: string;
	public type: string;
	public flgpre: number; // boolean
	public flgpost: number; // boolean
	public prehtml: string;
	public posthtml: string;
	public tpattachment: string;
	public tpattachment_fk: TypologicalDTO;
	public content: string;
}
