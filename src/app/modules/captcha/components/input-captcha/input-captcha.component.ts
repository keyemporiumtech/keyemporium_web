import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApplicationLoggerService, StringTranslate } from '@ddc/kit';
import { BaseInputComponent } from '../../../../shared/form/base-input.component';
import { CaptchaService } from '../../services/captcha.service';
import { VerificationCaptchaService } from '../../services/verification-captcha.service';

@Component({
	selector: 'ddc-init-input-captcha',
	templateUrl: './input-captcha.component.html',
	styleUrls: ['./input-captcha.component.scss'],
})
export class InputCaptchaComponent extends BaseInputComponent {
	@Input() keyClient: string;
	@Input() automaticVerify: boolean;
	@Input() label: string | StringTranslate = 'APP.LABEL.CAPTCHA.NOT_ROBOT';
	@Input() cssClass: any;
	@Input() cssStyle: any;
	@Input() cssClassImage: any;
	@Input() cssStyleImage: any;
	// css - single
	@Input() borderColor: string = '#000';
	@Input() imageHeight: string = '3.5rem';

	// logica
	@Input() isExternalService: boolean;

	@Output() generated: EventEmitter<string> = new EventEmitter<string>();
	@Output() verified: EventEmitter<boolean> = new EventEmitter<boolean>();

	checked: boolean = false;

	subGenerate: Subscription;
	subVerify: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private captchaService: CaptchaService,
		private verificationCaptchaService: VerificationCaptchaService,
	) {
		super(applicationLogger);
	}
	ngOnInitForChildren() {
		super.ngOnInitForChildren();
		this.manageStyleDiv();
		this.manageStyleImage();
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
		if (this.subGenerate) {
			this.subGenerate.unsubscribe();
		}
		if (this.subVerify) {
			this.subVerify.unsubscribe();
		}
	}
	setAutomaticValidations() {
		// this.inAutomatic = true;
	}

	setPropertiesFromField() {}
	getClassName(): string {
		return 'InputCaptchaComponent';
	}

	// ------ utils
	private manageStyleDiv() {
		if (!this.cssStyle) {
			this.cssStyle = {};
		}
		if (this.borderColor) {
			this.cssStyle.border = '1px solid ' + this.borderColor;
		}
	}
	private manageStyleImage() {
		if (!this.cssStyleImage) {
			this.cssStyleImage = {};
		}
		if (this.imageHeight) {
			this.cssStyleImage.height = this.imageHeight;
		}
	}
	// ------ operations
	manageClick() {
		if (this.control.value) {
			this.checked = false;
			this.control.setValue(undefined);
		} else {
			this.generate();
		}
	}

	generate() {
		const $obs = this.isExternalService
			? this.verificationCaptchaService.generateCode()
			: this.captchaService.generate(this.keyClient);
		this.subGenerate = $obs.subscribe((res) => {
			this.control.setValue(res);
			this.generated.emit(res);
			this.checked = true;
		});
	}

	verify() {
		const $obs = this.isExternalService
			? this.verificationCaptchaService.verifyCode(this.control.value)
			: this.captchaService.verify(this.control.value);
		this.subVerify = $obs.subscribe((res) => {
			this.verified.emit(res);
		});
	}
}
