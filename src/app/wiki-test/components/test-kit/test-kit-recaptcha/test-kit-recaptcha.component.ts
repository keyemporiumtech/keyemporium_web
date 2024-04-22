import { Component, OnDestroy } from '@angular/core';
import { RecaptchaVerifyInterface } from '@ddc/kit';
import { Subscription } from 'rxjs';
import { GooglerecaptchaVerifyModel } from '../../../../modules/captcha/models/googlerecaptcha-verify.model';
import { GooglerecaptchaService } from '../../../../modules/captcha/services/googlerecaptcha.service';

@Component({
	selector: 'wiki-test-kit-recaptcha',
	templateUrl: './test-kit-recaptcha.component.html',
	styleUrls: ['./test-kit-recaptcha.component.scss'],
})
export class TestKitRecaptchaComponent implements OnDestroy {
	message1: string = '';
	response1: GooglerecaptchaVerifyModel;
	validation1: RecaptchaVerifyInterface;

	// sub
	subVerify1: Subscription;

	constructor(private googlerecaptchaService: GooglerecaptchaService) {}

	onResolved1(message: string) {
		this.message1 = message;
		this.subVerify1 = this.googlerecaptchaService.verify(this.message1).subscribe((res) => {
			this.response1 = res;
		});
	}
	/* NOT USED */
	onValidation1(val: RecaptchaVerifyInterface) {
		this.validation1 = val;
	}

	ngOnDestroy(): void {
		if (this.subVerify1) {
			this.subVerify1.unsubscribe();
		}
	}
}
