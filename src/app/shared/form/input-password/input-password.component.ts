import { Component, Input } from '@angular/core';
import { BaseInputComponent } from '../base-input.component';
import {
	ApplicationLoggerService,
	CustomValidatorsMessages,
	CustomValidators,
	StringTranslate,
} from '@ddc/kit';
import { Validators } from '@angular/forms';

@Component({
	selector: 'ddc-init-input-password',
	templateUrl: './input-password.component.html',
	styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent extends BaseInputComponent {
	@Input() minLength: number;
	@Input() maxLength: number;
	@Input() almostOneNumber: boolean;
	@Input() almostOneUpper: boolean;
	@Input() almostOneLower: boolean;

	// text properties
	@Input() textShow: string | StringTranslate;
	@Input() textHide: string | StringTranslate;
	@Input() titleShow: string | StringTranslate;
	@Input() titleHide: string | StringTranslate;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		super.ngOnInitForChildren();
		this.manageInfo();
		this.manageMessages();
		this.applySubscription();
		this.applySubscriptionStatus();
		if (!this.titleShow) {
			this.titleShow = 'APP.BUTTON.SHOW';
		}
		if (!this.titleHide) {
			this.titleHide = 'APP.BUTTON.HIDE';
		}
	}

	behaviourOnSubscribe(values: any) {
		this.manageMessages();
	}

	behaviourOnSubscribeStatus(status: any) {
		this.manageMessages();
	}
	ngAfterViewInitForChildren() {
		super.ngAfterViewInitForChildren();
	}
	ngOnDestroyForChildren() {
		super.ngOnDestroyForChildren();
	}
	getClassName(): string {
		return 'InputPasswordComponent';
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
			if (this.almostOneNumber) {
				this.addOtherValidation(CustomValidators.almostOneNumber);
				this.field.validations.push(CustomValidatorsMessages.ALMOST_ONE_NUMBER());
				this.inAutomatic = true;
			}
			if (this.almostOneUpper) {
				this.addOtherValidation(CustomValidators.almostOneUpper);
				this.field.validations.push(CustomValidatorsMessages.ALMOST_ONE_UPPER());
				this.inAutomatic = true;
			}
			if (this.almostOneLower) {
				this.addOtherValidation(CustomValidators.almostOneLower);
				this.field.validations.push(CustomValidatorsMessages.ALMOST_ONE_LOWER());
				this.inAutomatic = true;
			}
		}
	}

	setPropertiesFromField() {
		this.minLength = this.field.property.minLength;
		this.maxLength = this.field.property.maxLength;
		this.almostOneNumber = this.field.property.almostOneNumber;
		this.almostOneUpper = this.field.property.almostOneUpper;
		this.almostOneLower = this.field.property.almostOneLower;
	}
}
