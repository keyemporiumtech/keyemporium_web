import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	ApplicationLoggerService,
	BaseComponent,
	MessageValidatorInterface,
	StringTranslate,
} from '@ddc/kit';
import { Subscription } from 'rxjs';

@Component({
	selector: 'ddc-init-field-validation',
	templateUrl: './field-validation.component.html',
	styleUrls: ['./field-validation.component.scss'],
})
export class FieldValidationComponent extends BaseComponent {
	subStatus: Subscription;
	@Input() control: FormControl;
	// VALIDATIONS
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
	@Input() submitted: boolean;
	@Input() validations: MessageValidatorInterface[];
	@Input() flgOnInitValidation: boolean; // scatta la validazione all'inizio
	@Input() flgOnSubmitValidation: boolean; // validazione al submit del form (controllo della variabile submitted)
	@Input() showValid: boolean;
	@Input() messageValid: string | StringTranslate;
	@Input() messageSupport: string | StringTranslate;
	@Input() classValid: string = 'input-valid-message';
	@Input() classInvalid: string = 'input-invalid-message';
	@Input() classSupport: string = 'input-support-message';

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'FieldValidationComponent';
	}

	// VALIDATIONS
	hasError(validation: any): boolean {
		return this.control.hasError(validation.type);
	}
	isCome(): boolean {
		return this.flgOnSubmitValidation
			? this.submitted
			: this.control.dirty ||
					this.control.touched ||
					(this.flgOnInitValidation && this.control.untouched);
	}
	getValidationMessage(validation: MessageValidatorInterface): StringTranslate {
		return new StringTranslate(validation.message, validation.params);
	}
}
