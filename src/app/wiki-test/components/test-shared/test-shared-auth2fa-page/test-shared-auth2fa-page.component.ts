import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription, switchMap } from 'rxjs';
import {
	ApplicationStorageService,
	MagicValidatorUtil,
	OptionListModel,
	PreviousRouteService,
} from '@ddc/kit';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';
import {
	AuthenticationService,
	UserAuthRequest,
	UserAuthResponse,
} from '../../../../modules/authentication/base/authentication.service';
import { ExpirationInfo, PayloadInterface } from '@ddc/rest';
import { PayloadUserInterface } from '../../../../modules/authentication/interfaces/payload-user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthCommonService } from '../../../../modules/authentication/services/auth-common.service';
import { VerificationKeysService } from '../../../../modules/authentication/services/verification-keys.service';

@Component({
	selector: 'wiki-test-shared-auth2fa-page',
	templateUrl: './test-shared-auth2fa-page.component.html',
	styleUrls: ['./test-shared-auth2fa-page.component.scss'],
})
export class TestSharedAuth2faPageComponent implements OnInit, OnDestroy {
	@Input() checkAble: boolean;

	form: FormGroup;
	formCheck: FormGroup;
	username: FormFieldModel;
	password: FormFieldModel;
	rememberme: FormFieldModel;
	optionRememberme: OptionListModel[];
	code: FormFieldModel;
	validations: any = {};

	subLogin: Subscription;
	subLogout: Subscription;
	subSession: Subscription;

	codeVerified: boolean;

	userResponse: UserAuthResponse;
	authtoken: string;
	payload: PayloadInterface;
	userLogged: PayloadUserInterface;
	userId: string;
	userImage: any;
	profile: string;
	messageSession: string = '';
	expirationInfo: ExpirationInfo;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private previousRoute: PreviousRouteService,
		private applicationStorage: ApplicationStorageService,
		private authCommonService: AuthCommonService,
		private authentication: AuthenticationService,
		private verificationKeysService: VerificationKeysService,
	) {
		this.form = this.fb.group({
			username: new MagicValidatorUtil((this.validations.username = []), 'test2@gmail.com')
				.required()
				.build(),
			password: new MagicValidatorUtil((this.validations.password = []), 'Test_002')
				.required()
				.build(),
			rememberme: [undefined],
		});

		this.username = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('username') as FormControl,
			'Username',
		)
			.validation(this.validations.username)
			.onInit();

		this.password = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('password') as FormControl,
			'Password',
		)
			.validation(this.validations.password)
			.onInit();

		this.rememberme = new FormFieldModel(
			EnumFormType.CHECKBOX,
			this.form.get('rememberme') as FormControl,
			'Ricordami label',
		).onInit();

		this.optionRememberme = [new OptionListModel(1, 'Ricordami')];

		this.formCheck = this.fb.group({
			code: new MagicValidatorUtil((this.validations.code = []), undefined).required().build(),
		});

		this.code = new FormFieldModel(
			EnumFormType.TEXT,
			this.formCheck.get('code') as FormControl,
			'Codice di verifica',
		)
			.validation(this.validations.code)
			.onInit();
	}

	ngOnInit() {
		this.checkSession();
	}
	ngOnDestroy() {
		if (this.subLogin) {
			this.subLogin.unsubscribe();
		}
		if (this.subLogout) {
			this.subLogout.unsubscribe();
		}
		if (this.subSession) {
			this.subSession.unsubscribe();
		}
	}

	goToAuth2fa() {
		const raw = this.form.getRawValue();
		const user: UserAuthRequest = {
			username: raw.username,
			password: raw.password,
			rememberme: raw.rememberme === 1 ? true : false,
		};
		const p1 = btoa(JSON.stringify(user));
		this.previousRoute.navigate(['commons', 'keys'], { queryParams: { p1: p1 } }, undefined, {
			queryParams: { returnByAuth2fa: '1' },
		});
	}

	login() {
		const raw = this.formCheck.getRawValue();
		const code = raw.code;

		this.subLogin = this.verificationKeysService
			.getmeToken(this.form.get('username').value)
			.pipe(
				switchMap((token) => {
					return this.verificationKeysService.verifyCode(token, code);
				}),
			)
			.subscribe((res) => {
				this.codeVerified = res;
			});
	}

	checkSession() {
		this.subSession = this.authentication.checkSession().subscribe((res) => {
			this.messageSession = res ? 'SESSIONE ATTIVA' : 'SESSIONE SCADUTA O NON VALIDA';
			if (res) {
				this.evalStorage();
			} else {
				this.authentication.emptyAuthSession();
			}
		});
	}

	logout() {
		this.subLogout = this.authentication.logout().subscribe((res) => {
			this.evalStorage();
			this.messageSession = 'SESSIONE SPENTA';
		});
	}

	reload() {
		this.previousRoute.navigate(['commons', 'reload'], undefined, ['wiki', 'shared'], {
			queryParams: { view: 'AUTH2FA-PAGE' },
		});
	}

	// utils

	evalStorage() {
		this.authtoken = this.applicationStorage.authtoken.get();
		this.payload = this.applicationStorage.payload.getObj();
		this.userLogged = this.applicationStorage.userLogged.getObj();
		this.userId = this.applicationStorage.userId.get();
		this.userImage = this.applicationStorage.userImage.get();
		this.profile = this.applicationStorage.profile.get();
		// expiration
		this.expirationInfo = this.authentication.getExpirationInfo();

		this.authCommonService.notifySession(this.userId ? true : false);
	}
}
