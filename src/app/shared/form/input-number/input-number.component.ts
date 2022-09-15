import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { ApplicationLoggerService, CustomValidators, CustomValidatorsMessages } from '@ddc/kit';
import { BaseInputComponent } from '../base-input.component';

@Component({
	selector: 'ddc-init-input-number',
	templateUrl: './input-number.component.html',
	styleUrls: ['./input-number.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent extends BaseInputComponent {
	@Input() min: number;
	@Input() max: number;
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
		return 'InputNumberComponent';
	}

	setAutomaticValidations() {
		if (this.automaticValidators) {
			this.inAutomatic = true;
			this.addOtherValidation(CustomValidators.isInteger);
			this.field.validations.push(CustomValidatorsMessages.IS_INTEGER());
			this.commonMinMaxAutomaticValidations();
		}
	}

	commonMinMaxAutomaticValidations() {
		if (this.min) {
			this.addOtherValidation(Validators.min(this.min));
			this.field.validations.push(CustomValidatorsMessages.MIN(this.min));
			this.inAutomatic = true;
		}
		if (this.max) {
			this.addOtherValidation(Validators.max(this.max));
			this.field.validations.push(CustomValidatorsMessages.MAX(this.max));
			this.inAutomatic = true;
		}
	}

	setPropertiesFromField() {
		if (this.field.property.min && typeof this.field.property.min === 'number') {
			this.min = this.field.property.min;
		}
		if (this.field.property.max && typeof this.field.property.max === 'number') {
			this.max = this.field.property.max;
		}
	}
}
