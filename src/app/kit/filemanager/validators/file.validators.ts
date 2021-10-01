import { AbstractControl } from '@angular/forms';

export class FileValidators {
	static UPLOAD_ERROR_VALUE = 'WARNING';
	static uploadError = (value: string) => (control: AbstractControl) => {
		if (control.value && value === FileValidators.UPLOAD_ERROR_VALUE) {
			return { uploadError: true };
		} else {
			return;
		}
	};
}
