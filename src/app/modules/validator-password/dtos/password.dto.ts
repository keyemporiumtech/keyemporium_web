import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class PasswordDTO extends ApiDTO {
	public input: string;
	public level: number;
}
