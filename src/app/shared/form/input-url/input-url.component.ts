import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseInputComponent } from '../base-input.component';
import { ApplicationLoggerService, CustomValidators, CustomValidatorsMessages } from '@ddc/kit';

@Component({
	selector: 'ddc-init-input-url',
	templateUrl: './input-url.component.html',
	styleUrls: ['./input-url.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputUrlComponent extends BaseInputComponent {
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
		return 'InputUrlComponent';
	}

	setAutomaticValidations() {
		this.addOtherValidation(CustomValidators.isUrl);
		this.field.validations.push(CustomValidatorsMessages.IS_URL());
		this.inAutomatic = true;
	}

	setPropertiesFromField() {}
}
