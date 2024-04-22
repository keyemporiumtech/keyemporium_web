import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ProjecttaskDTO } from './projecttask.dto';

export class TaskusecaseDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public task: string;
	public task_fk: ProjecttaskDTO;
}
