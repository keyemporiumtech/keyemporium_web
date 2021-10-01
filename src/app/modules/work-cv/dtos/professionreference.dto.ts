import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ContactreferenceDTO } from '../../authentication/dtos/contactreference.dto';
import { ProfessionDTO } from './profession.dto';

export class ProfessionreferenceDTO extends ApiDTO {
	public cod: string;
	public profession: string;
	public profession_fk: ProfessionDTO;
	public contactreference: string;
	public contactreference_fk: ContactreferenceDTO;
}
