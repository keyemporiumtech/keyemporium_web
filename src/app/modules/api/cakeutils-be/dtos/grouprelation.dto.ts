import { ApiDTO } from '../../cakeutils/base/api.dto';
import { GroupDTO } from './group.dto';

export class GrouprelationDTO extends ApiDTO {
	public cod: string;
	public group: string;
	public group_fk: GroupDTO;
	public groupcod: string;
	public tablename: string;
	public tableid: string;
}
