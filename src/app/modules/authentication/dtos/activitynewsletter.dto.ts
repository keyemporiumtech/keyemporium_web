import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from './activity.dto';
import { NewsletterDTO } from './newsletter.dto';

export class ActivitynewsletterDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public activity: string;
	public activity_fk: ActivityDTO;
	public newsletter: string;
	public newsletter_fk: NewsletterDTO;
}
