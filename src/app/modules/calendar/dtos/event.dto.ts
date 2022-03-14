import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class EventDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public description: string;
	public dtainit: string; // date
	public dtaend: string; // date
	public tpevent: string;
	public tpevent_fk: TypologicalDTO;
	public tpcat: string;
	public tpcat_fk: TypologicalDTO;
	public flgdeleted: number; // boolean
}
