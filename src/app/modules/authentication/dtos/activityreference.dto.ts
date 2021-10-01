import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from './activity.dto';
import { ContactreferenceDTO } from './contactreference.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';

export class ActivityreferenceDTO extends ApiDTO {
	public cod: string;
	public flgprincipal: number; // boolean
	public activity: string;
	public activity_fk: ActivityDTO;
	public contactreference: string;
	public contactreference_fk: ContactreferenceDTO;
	public tpcontactreference: string;
	public tpcontactreference_fk: TypologicalDTO;
	public group: string;
}
