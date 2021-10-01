import { FormControl } from '@angular/forms';
import { StringTranslate } from '@ddc/kit';

export interface FormInputValidationStyleInterface {
	condition: (control: FormControl) => boolean;
	class?: string; // non usare spazi
	color?: string;
	icon?: string; // icona fa (ex. fa-check)
	message?: (control: FormControl) => string | StringTranslate;
}
