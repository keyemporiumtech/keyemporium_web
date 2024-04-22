import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { NewsletterDTO } from './newsletter.dto';
import { UserDTO } from './user.dto';

export class UsernewsletterDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public user: string;
	public user_fk: UserDTO;
	public newsletter: string;
	public newsletter_fk: NewsletterDTO;
}
