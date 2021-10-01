import { MailerDTO } from '../../communication/dtos/mailer.dto';

export class ConfirmoperationRequest {
	public flgsms?: number; // boolean
	public phone?: string;
	public flgemail?: number; // boolean
	public email?: string;
	public mailer?: MailerDTO;
}
