import { Observable, of } from 'rxjs';
import { ChatbotMessageInterface } from '../interfaces/chatbot-message.interface';
export class ChatbotUtility {
	static exampleRes(
		text: string,
		type?: 'IN' | 'OUT' | 'ERROR',
	): Observable<ChatbotMessageInterface> {
		return of({
			type: !type ? 'OUT' : type,
			value: type === 'ERROR' ? 'Mi dispiace non so che dirti' : 'La risposta è si',
		});
	}

	static exampleResHtml(
		text: string,
		type?: 'IN' | 'OUT' | 'ERROR',
	): Observable<ChatbotMessageInterface> {
		return of({
			type: !type ? 'OUT' : type,
			value:
				type === 'ERROR'
					? 'Mi dispiace non so che dirti<br/><strong>Dovresti provare</strong> <a href="http:\\\\www.google.com" target="_blank">qui</a>'
					: 'La risposta è da cercare <i style="color:red">dentro di te</i>',
		});
	}
}
