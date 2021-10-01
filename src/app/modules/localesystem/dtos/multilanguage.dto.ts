import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { LanguageDTO } from './language.dto';

export class MultilanguageDTO extends ApiDTO {
	public tablename: string;
	public fieldname: string;
	public content: string;
	public objraw: string;
	public languageid: string;
	public language_fk: LanguageDTO;
	public languagecod: string;
	public type: string;
}
