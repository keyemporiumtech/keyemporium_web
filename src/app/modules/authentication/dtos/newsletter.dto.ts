import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class NewsletterDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public description: string;
}
