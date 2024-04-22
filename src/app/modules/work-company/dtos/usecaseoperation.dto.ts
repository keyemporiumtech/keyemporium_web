import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { TaskusecaseDTO } from './taskusecase.dto';

export class UsecaseoperationDTO extends ApiDTO {
	public cod: string;
	public operation: string;
	public actorfrom: string;
	public actorto: string;
	public start: number;
	public usecase: string;
	public usecase_fk: TaskusecaseDTO;
}
