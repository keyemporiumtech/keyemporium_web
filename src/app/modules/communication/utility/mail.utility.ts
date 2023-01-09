import { MailUserModel } from '../models/mail-user.model';
import { environment } from '../../../../environments/environment';

export class MailUtility {
	static getDefaultContactMail(): MailUserModel {
		const model = new MailUserModel();
		model.name = environment.contacts.contactName;
		model.email = environment.contacts.contactEmail;
		return model;
	}
}
