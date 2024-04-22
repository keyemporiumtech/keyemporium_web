import { ChatbotMessageInterface } from '../interfaces/chatbot-message.interface';
import { Observable } from 'rxjs';
import { BaseService } from '../../abstract/base.service';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';

export abstract class ChatbotBaseService extends BaseService {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	abstract ask(text: string, filters?: any): Observable<ChatbotMessageInterface[]>;
}
