import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class GooglerecaptchaVerifyDTO extends ApiDTO {
	public success: boolean;
	public challenge_ts: string;
	public hostname: string;
	public errors: string[];
}
