import { FormControl } from '@angular/forms';
import { MessageFromChatToSocketInterface } from './message-from-chat-to-socket.interface';

export class ContactChatModel {
	public contactId: string; // receiver
	public image: string; // immagine del receiver
	public messages: MessageFromChatToSocketInterface[]; // messaggi scambiati con il riceiver
	public notifications: number; // numero di notifiche ricevute dal receiver
	public open: boolean; // chat con il receiver aperta
	public waiting: boolean; // notifica quando il receiver sta scrivendo
	// flags di controllo quando il sender sta scrivendo per evitare l'invio multiplo di messaggi di waiting mentre il sending sta scrivendo
	public waitingSender: boolean;
	public control: FormControl;
	public status: boolean; // online-offline
	public object: any; // modello originale

	constructor(contactId: string, image?: string, messages?: MessageFromChatToSocketInterface[]) {
		this.contactId = contactId;
		this.image = image;
		this.messages = messages && messages.length ? messages : [];
		this.notifications = 0;
	}
}
