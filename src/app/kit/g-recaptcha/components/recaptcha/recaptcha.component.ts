import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecaptchaVerifyInterface } from '../../interfaces/recaptcha-verify.interface';

@Component({
	selector: 'ddc-init-recaptcha',
	templateUrl: './recaptcha.component.html',
	styleUrls: ['./recaptcha.component.scss'],
})
export class RecaptchaComponent extends BaseComponent {
	@Input() keyClient: string;
	@Input() keyServer: string;
	@Input() remoteIP: string;
	@Output() resolved: EventEmitter<string> = new EventEmitter<string>();
	@Output() errored: EventEmitter<RecaptchaErrorParameters> =
		new EventEmitter<RecaptchaErrorParameters>();
	@Output() validation: EventEmitter<RecaptchaVerifyInterface> =
		new EventEmitter<RecaptchaVerifyInterface>();
	token: string;
	status: RecaptchaVerifyInterface;

	@ViewChild('captchaEl') captchaEl: any;
	http: HttpClient;

	// sub
	subVerify: Subscription;

	constructor(applicationLogger: ApplicationLoggerService, http: HttpClient) {
		super(applicationLogger);
		this.http = http;
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subVerify) {
			this.subVerify.unsubscribe();
		}
	}
	getClassName(): string {
		return 'RecaptchaComponent';
	}

	onResolved(res: string) {
		this.token = res;
		this.resolved.emit(this.token);
		// this.verify(this.token);
	}

	onError(errorDetails: RecaptchaErrorParameters) {
		this.errored.emit(errorDetails);
	}

	/* NOT USED FOR CORSS PROBLEM*/
	verify(token: string) {
		let body: HttpParams = new HttpParams();
		body = body.append('secret', this.keyServer);
		body = body.append('response', token);
		body = body.append('remoteip', this.remoteIP);
		const url =
			'https://www.google.com/recaptcha/api/siteverify?secret=6Ld5hX0pAAAAANFmu3aBd25ul8Yr7YrXC7cRA9IE&response=' +
			token;
		this.subVerify = this.http.post(url, {}).subscribe((res: any) => {
			this.status = {
				success: res.success,
				challenge_ts: res.challenge_ts,
				hostname: res.hostname,
				errorcodes: res['error-codes'],
			};
			this.validation.emit(this.status);
		});
	}
}
