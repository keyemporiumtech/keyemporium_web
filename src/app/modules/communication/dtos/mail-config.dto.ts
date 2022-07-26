import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class MailConfigDTO extends ApiDTO {
	public host?: string;
	public port?: string;
	public user?: string;
	public password?: string;
	public passwordCrypted?: string;
}
