import { HttpResponse } from '@angular/common/http';
import { MessageStatusModel } from '../models/message-status.model';

export class ResponseCakeUtility {
	static buildMessageStatus(res: HttpResponse<any> | any): MessageStatusModel {
		const status = new MessageStatusModel();
		status.statusCod = res.headers.get('statuscod');
		status.applicationMessage = {
			cod: res.headers.get('messagecod'),
			message: res.headers.get('message'),
			type: res.headers.get('messagetype'),
		};
		status.exceptionMessage = {
			cod: res.headers.get('exceptioncod'),
			message: res.headers.get('exception'),
		};
		return status;
	}
}
