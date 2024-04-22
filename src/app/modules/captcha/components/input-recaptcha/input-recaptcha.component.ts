import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplicationLoggerService, EnumRecaptchaError, MessageValidatorUtil } from '@ddc/kit';
import { Subscription } from 'rxjs';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { AbstractControl } from '@angular/forms';
import { BaseInputComponent } from '../../../../shared/form/base-input.component';
import { GooglerecaptchaService } from '../../services/googlerecaptcha.service';

@Component({
	selector: 'ddc-init-input-recaptcha',
	templateUrl: './input-recaptcha.component.html',
	styleUrls: ['./input-recaptcha.component.scss'],
})
export class InputRecaptchaComponent extends BaseInputComponent {
	@Input() keyClient: string;
	@Input() automaticVerify: boolean;
	@Output() verified: EventEmitter<boolean> = new EventEmitter<boolean>();

	subVerify: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private googlerecaptchaService: GooglerecaptchaService,
	) {
		super(applicationLogger);
	}
	ngOnInitForChildren() {
		super.ngOnInitForChildren();
		this.manageInfo();
		this.manageMessages();
		this.applySubscription();
		this.applySubscriptionStatus();
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
		if (this.subVerify) {
			this.subVerify.unsubscribe();
		}
	}

	setAutomaticValidations() {
		this.addOtherValidation(this.CAPTCHA_BAD_REQUEST);
		this.field.validations.push(this.IS_CAPTCHA_BAD_REQUEST());
		this.addOtherValidation(this.CAPTCHA_INVALID_INPUT_RESPONSE);
		this.field.validations.push(this.IS_CAPTCHA_INVALID_INPUT_RESPONSE());
		this.addOtherValidation(this.CAPTCHA_INVALID_INPUT_SECRET);
		this.field.validations.push(this.IS_CAPTCHA_INVALID_INPUT_SECRET());
		this.addOtherValidation(this.CAPTCHA_MISSING_INPUT_RESPONSE);
		this.field.validations.push(this.IS_CAPTCHA_MISSING_INPUT_RESPONSE());
		this.addOtherValidation(this.CAPTCHA_MISSING_INPUT_SECRET);
		this.field.validations.push(this.IS_CAPTCHA_MISSING_INPUT_SECRET());
		this.addOtherValidation(this.CAPTCHA_TIMEOUT_OR_DUPLICATE);
		this.field.validations.push(this.IS_CAPTCHA_TIMEOUT_OR_DUPLICATE());
		this.inAutomatic = true;
	}

	setPropertiesFromField() {}
	getClassName(): string {
		return 'InputRecaptchaComponent';
	}

	onResolved(key: string) {
		if (this.automaticVerify) {
			this.automaticVerification(key);
		} else {
			this.control.setValue(key);
		}
	}

	private automaticVerification(key: string) {
		if (!key) {
			this.control.setValue(undefined);
		} else {
			this.verify(key);
		}
	}

	onError(error: RecaptchaErrorParameters) {
		this.control.setValue(EnumRecaptchaError.BAD_REQUEST.toString());
	}

	verify(key?: string) {
		if (!key) {
			key = this.control.value;
		}
		this.subVerify = this.googlerecaptchaService.verify(key).subscribe((res) => {
			this.control.setValue(
				res.success ? key : res.errors && res.errors.length ? res.errors[0] : undefined,
			);
			this.verified.emit(res.success);
		});
	}

	// validations
	CAPTCHA_BAD_REQUEST = (control: AbstractControl) => {
		if (control.value && control.value === EnumRecaptchaError.BAD_REQUEST.toString()) {
			return { CAPTCHA_BAD_REQUEST: true };
		} else {
			return;
		}
	};

	IS_CAPTCHA_BAD_REQUEST = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'CAPTCHA_BAD_REQUEST',
			message ? message : 'MESSAGE.GOOGLE_RECAPTCHA.BAD_REQUEST',
			params,
		);
	};

	CAPTCHA_INVALID_INPUT_RESPONSE = (control: AbstractControl) => {
		if (control.value && control.value === EnumRecaptchaError.INVALID_INPUT_RESPONSE.toString()) {
			return { CAPTCHA_INVALID_INPUT_RESPONSE: true };
		} else {
			return;
		}
	};

	IS_CAPTCHA_INVALID_INPUT_RESPONSE = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'CAPTCHA_INVALID_INPUT_RESPONSE',
			message ? message : 'MESSAGE.GOOGLE_RECAPTCHA.INVALID_INPUT_RESPONSE',
			params,
		);
	};

	CAPTCHA_INVALID_INPUT_SECRET = (control: AbstractControl) => {
		if (control.value && control.value === EnumRecaptchaError.INVALID_INPUT_SECRET.toString()) {
			return { CAPTCHA_INVALID_INPUT_SECRET: true };
		} else {
			return;
		}
	};

	IS_CAPTCHA_INVALID_INPUT_SECRET = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'CAPTCHA_INVALID_INPUT_SECRET',
			message ? message : 'MESSAGE.GOOGLE_RECAPTCHA.INVALID_INPUT_SECRET',
			params,
		);
	};

	CAPTCHA_MISSING_INPUT_RESPONSE = (control: AbstractControl) => {
		if (control.value && control.value === EnumRecaptchaError.MISSING_INPUT_RESPONSE.toString()) {
			return { CAPTCHA_MISSING_INPUT_RESPONSE: true };
		} else {
			return;
		}
	};

	IS_CAPTCHA_MISSING_INPUT_RESPONSE = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'CAPTCHA_MISSING_INPUT_RESPONSE',
			message ? message : 'MESSAGE.GOOGLE_RECAPTCHA.MISSING_INPUT_RESPONSE',
			params,
		);
	};

	CAPTCHA_MISSING_INPUT_SECRET = (control: AbstractControl) => {
		if (control.value && control.value === EnumRecaptchaError.MISSING_INPUT_SECRET.toString()) {
			return { CAPTCHA_MISSING_INPUT_SECRET: true };
		} else {
			return;
		}
	};

	IS_CAPTCHA_MISSING_INPUT_SECRET = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'CAPTCHA_MISSING_INPUT_SECRET',
			message ? message : 'MESSAGE.GOOGLE_RECAPTCHA.MISSING_INPUT_SECRET',
			params,
		);
	};

	CAPTCHA_TIMEOUT_OR_DUPLICATE = (control: AbstractControl) => {
		if (control.value && control.value === EnumRecaptchaError.TIMEOUT_OR_DUPLICATE.toString()) {
			return { CAPTCHA_TIMEOUT_OR_DUPLICATE: true };
		} else {
			return;
		}
	};

	IS_CAPTCHA_TIMEOUT_OR_DUPLICATE = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'CAPTCHA_TIMEOUT_OR_DUPLICATE',
			message ? message : 'MESSAGE.GOOGLE_RECAPTCHA.TIMEOUT_OR_DUPLICATE',
			params,
		);
	};
}
