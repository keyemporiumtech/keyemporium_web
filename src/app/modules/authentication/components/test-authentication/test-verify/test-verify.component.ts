import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApplicationStorageService, MagicValidatorUtil } from '@ddc/kit';
import { Subscription } from 'rxjs';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { AuthenticationService, UserAuthRequest } from '../../../base/authentication.service';
import { ConfirmoperationRequest } from '../../../dtos/confirmoperation-request';
import { AuthCommonService } from '../../../services/auth-common.service';
import { TestLoginComponent } from '../test-login/test-login.component';

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
		authCommonService: AuthCommonService,
	) {
		super(fb, applicationStorage, authentication, authCommonService);
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
		this.evalStorage();
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
