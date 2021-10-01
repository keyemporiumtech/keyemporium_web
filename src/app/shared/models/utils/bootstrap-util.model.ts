import { StringTranslate } from '@ddc/kit';
import { BootstrapUtils } from '../../utils/bootstrap-utils';

export class BootstrapUtilModel {
	size?: string;
	prepend?: string | StringTranslate;
	append?: string | StringTranslate;

	get sizeCol(): string {
		return BootstrapUtils.getSize(this.size, 'col-');
	}
}
