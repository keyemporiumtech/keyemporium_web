import { FormGroup, FormBuilder } from '@angular/forms';

export class WizardStepModel {
	public submitted: boolean;
	constructor(
		public name: string,
		public label: string,
		public getForm: (fb: FormBuilder) => FormGroup,
		public fillForm: (form: FormGroup, model: any) => void,
		public extractData: (form: FormGroup) => any,
		public readonly?: boolean,
		public hidden?: boolean,
	) {}
}
