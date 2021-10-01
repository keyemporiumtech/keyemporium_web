import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestLoginComponent } from '../test-login/test-login.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApplicationStorageService, MagicValidatorUtil } from '@ddc/kit';
import { AuthenticationService, UserAuthRequest } from '../../../base/authentication.service';
import { ConfirmoperationRequest } from '../../../dtos/confirmoperation-request';
import { config, Subscription } from 'rxjs';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';

@Component({
	selector: 'wiki-test-verify',
	templateUrl: './test-verify.component.html',
	styleUrls: ['./test-verify.component.scss'],
})
export class TestVerifyComponent extends TestLoginComponent implements OnInit, OnDestroy {
	enableCode: boolean;
	formCode: FormGroup;
	code: FormFieldModel;

	subVerify: Subscription;
	constructor(
		fb: FormBuilder,
		applicationStorage: ApplicationStorageService,
		authentication: AuthenticationService,
	) {
		super(fb, applicationStorage, authentication);
		this.formCode = this.fb.group({
			code: new MagicValidatorUtil((this.validations.code = []), undefined).required().build(),
		});

		this.code = new FormFieldModel(
			EnumFormType.TEXT,
			this.formCode.get('code') as FormControl,
			'Pin ricevuto',
		)
			.validation(this.validations.code)
			.onInit();
	}

	ngOnInit() {
		super.ngOnInit();
	}

	ngOnDestroy() {
		super.ngOnDestroy();
		if (this.subVerify) {
			this.subVerify.unsubscribe();
		}
	}

	login() {
		const raw = this.form.getRawValue();
		const user: UserAuthRequest = {
			username: raw.username,
			password: raw.password,
			rememberme: raw.rememberme === 1 ? true : false,
		};
		const confirm: ConfirmoperationRequest = {};
		confirm.flgemail = 1;
		confirm.email = raw.username;
		confirm.flgsms = 0;
		this.subLogin = this.authentication.loginPin(user, confirm).subscribe((res) => {
			this.enableCode = res;
		});
	}

	verify() {
		const raw = this.formCode.getRawValue();
		this.subVerify = this.authentication.verifyPin(raw.code).subscribe((res) => {
			this.userResponse = res;
			this.evalStorage();
		});
	}
}
