import { BootstrapUtils } from '../../utils/bootstrap-utils';
import { FormFieldModel } from '../form/form-field.model';

export class FilterTableModel {
	controlName: string;
	field: FormFieldModel;
	size?: string;

	get sizeClass(): string {
		return !this.size ? 'col-12' : BootstrapUtils.getSize(this.size, 'col-');
	}
}
