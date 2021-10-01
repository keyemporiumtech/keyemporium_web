import { RequestManagerInterface } from '../../request/interfaces/request-manager.interface';
import { ResponseManagerInterface } from '../../response/interfaces/response-manager.interface';

export interface InputQueryInterface {
	requestManager?: RequestManagerInterface;
	responseManager?: ResponseManagerInterface;
}
