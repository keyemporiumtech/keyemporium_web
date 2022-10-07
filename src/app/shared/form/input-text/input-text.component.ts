import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { ApplicationLoggerService, CustomValidatorsMessages } from '@ddc/kit';
import { BaseInputComponent } from '../base-input.component';

@Component({
	selector: 'ddc-init-input-text',
	templateUrl: './input-text.component.html',
	styleUrls: ['./input-text.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent extends BaseInputComponent {
	@Input() minLength: number;
	@Input() maxLength: number;
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
		return 'InputTextComponent';
	}

	setAutomaticValidations() {
		if (this.automaticValidators) {
			if (this.minLength) {
				this.addOtherValidation(Validators.minLength(this.minLength));
				this.field.validations.push(CustomValidatorsMessages.MIN_LENGTH(this.minLength));
				this.inAutomatic = true;
			}
			if (this.maxLength) {
				this.addOtherValidation(Validators.maxLength(this.maxLength));
				this.field.validations.push(CustomValidatorsMessages.MAX_LENGTH(this.maxLength));
				this.inAutomatic = true;
			}
		}
	}

	setPropertiesFromField() {
		this.minLength = this.field.property.minLength;
		this.maxLength = this.field.property.maxLength;
	}
}
