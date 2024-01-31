import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityprojectDTO } from './activityproject.dto';

export class ProjecttaskDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public dtainit: string;
	public dtaend: string;
	public project: string;
	public project_fk: ActivityprojectDTO;
	public parent_id: string;
	public parent_fk: ProjecttaskDTO;
}
