import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';

export class ContactreferenceDTO extends ApiDTO {
	public cod: string;
	public val: string;
	public description: string;
	public tpcontactreference: string;
	public tpcontactreference_fk: TypologicalDTO;
	public tpsocialreference: string;
	public tpsocialreference_fk: TypologicalDTO;
	public prefix: string;
	public flgused: number; // boolean
	// added
	public nationimage: string; // base64
	public referenceimage: string; // base64
	public socialimage: string; // base64
}
