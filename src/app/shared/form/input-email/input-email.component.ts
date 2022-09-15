import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ApplicationLoggerService, CustomValidators, CustomValidatorsMessages } from '@ddc/kit';
import { BaseInputComponent } from '../base-input.component';

@Component({
	selector: 'ddc-init-input-email',
	templateUrl: './input-email.component.html',
	styleUrls: ['./input-email.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputEmailComponent extends BaseInputComponent {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'InputEmailComponent';
	}

	setAutomaticValidations() {
		this.addOtherValidation(CustomValidators.isValidEmail);
		this.field.validations.push(CustomValidatorsMessages.IS_VALID_EMAIL());
		this.inAutomatic = true;
	}

	setPropertiesFromField() {}
}
