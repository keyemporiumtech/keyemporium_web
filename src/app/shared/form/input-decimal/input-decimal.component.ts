import { Component, Input } from '@angular/core';
import { ApplicationLoggerService, CustomValidators, CustomValidatorsMessages } from '@ddc/kit';
import { InputNumberComponent } from '../input-number/input-number.component';

@Component({
	selector: 'ddc-init-input-decimal',
	templateUrl: './input-decimal.component.html',
	styleUrls: ['./input-decimal.component.scss'],
})
export class InputDecimalComponent extends InputNumberComponent {
	@Input() digits: number;
	@Input() step: string = 'any';
	pattern: string;
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
		if (this.digits && this.digits > 0) {
			this.step = '0.';
			for (let i = 0; i < this.digits; i++) {
				this.step += i === this.digits - 1 ? '1' : '0';
			}
			this.pattern = '^[0-9]+(.[0-9]{1,' + this.digits + '})?$';
		}
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'InputDecimalComponent';
	}

	setAutomaticValidations() {
		if (this.automaticValidators) {
			if (this.digits) {
				if (this.digits === 2) {
					this.addOtherValidation(CustomValidators.isDoublePrecision);
					this.field.validations.push(CustomValidatorsMessages.IS_DOUBLE_PRECISION());
				} else {
					this.addOtherValidation(CustomValidators.isSpecificPrecision(this.digits));
					this.field.validations.push(CustomValidatorsMessages.IS_SPECIFIC_PRECISION(this.digits));
				}
			}
			this.commonMinMaxAutomaticValidations();
		}
	}

	setPropertiesFromField() {
		super.setPropertiesFromField();
		this.digits = this.field.property.digits;
		if (this.field.property.step && typeof this.field.property.step === 'string') {
			this.step = this.field.property.step;
		}
	}
}
