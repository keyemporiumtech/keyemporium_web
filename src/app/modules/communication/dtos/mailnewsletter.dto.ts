import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { NewsletterDTO } from '../../authentication/dtos/newsletter.dto';
import { MailDTO } from './mail.dto';

export class MailnewsletterDTO extends ApiDTO {
	public cod: string;
	public mail: string;
	public mail_fk: MailDTO;
	public newsletter: string;
	public newsletter_fk: NewsletterDTO;
}
