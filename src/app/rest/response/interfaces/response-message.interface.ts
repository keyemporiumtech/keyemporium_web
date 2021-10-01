import { ResponseMessageSubjectModel } from '../models/response-message-subject.model';
import { ResponseMessageRoutingModel } from '../models/response-message-routing.model';

export interface ResponseMessageInterface {
	subject?: ResponseMessageSubjectModel;
	routing?: ResponseMessageRoutingModel;
	skipError?: boolean;
	handlePositiveMessage?: boolean;
}
