import { Component, Input } from '@angular/core';
import { BaseComponent, ApplicationLoggerService, StringTranslate } from '@ddc/kit';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'ddc-init-error-field',
	templateUrl: './error-field.component.html',
	styleUrls: ['./error-field.component.scss'],
})
export class ErrorFieldComponent extends BaseComponent {
	/**
   * Esempio di validations array
    [
      { type: 'required', message: 'VALIDATION.REQUIRED' },
      { type: 'notValidEmail', message: 'VALIDATION.EMAIL' },
      {
        type: 'minMaxLength',
        message: 'VALIDATION.MIN_MAX_LENGTH',
        params: { min: environment.passwordMinLength, max: environment.passwordMaxLength },
      }
    ]
  */
	@Input() validations: any[];
	@Input() form: FormGroup;
	@Input() field: string; // se non viene passato valida tutto il form
	@Input() icon: string;
	@Input() submitted: boolean;
	// validation type
	@Input() flgOnInitValidation: boolean; // scatta la validazione all'inizio
	@Input() flgSingleValidation: boolean; // unico messaggio per tutti gli errori : {type : 'invalid' ...}
	@Input() flgOnSubmitValidation: boolean; // validazione al submit del form (controllo della variabile submitted)
	// style
	@Input() classContainer: string = 'error-container'; // error-container -> { .error-message { .icon{} .text{} } }

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'ErrorFieldComponent';
	}

	hasError(validation: any): boolean {
		if (!this.field) {
			return this.form.invalid;
		}
		return this.flgSingleValidation
			? this.form.get(this.field).invalid
			: this.form.get(this.field).hasError(validation.type);
	}
	isCome(): boolean {
		return this.flgOnSubmitValidation
			? this.submitted
			: this.field
			? this.form.get(this.field).dirty ||
			  this.form.get(this.field).touched ||
			  (this.flgOnInitValidation && this.form.get(this.field).untouched)
			: this.form.dirty || this.form.touched || (this.flgOnInitValidation && this.form.untouched);
	}
	getMessageType(validation: any): string {
		return this.flgSingleValidation
			? this.getSingleValidation()
				? this.getSingleValidation().message
				: 'FIX: NO SINGLE VALIDATION EXIST'
			: new StringTranslate(validation.message);
	}
	getMessageParamsType(validation: any): any {
		return this.flgSingleValidation
			? this.getSingleValidation()
				? this.getSingleValidation().params
				: 'FIX: NO SINGLE VALIDATION EXIST'
			: new StringTranslate(validation.message, validation.params);
	}
	isShow(validation: any) {
		if (this.flgSingleValidation) {
			return validation.type === 'invalid' ? true : false;
		}
		return true;
	}

	private getSingleValidation(): any {
		return this.validations.find((el) => el.type === 'invalid');
	}
}
