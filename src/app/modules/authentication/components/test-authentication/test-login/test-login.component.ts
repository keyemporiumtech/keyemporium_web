import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApplicationStorageService, MagicValidatorUtil, OptionListModel } from '@ddc/kit';
import { ExpirationInfo, PayloadInterface } from '@ddc/rest';
import { Subscription } from 'rxjs';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import {
	AuthenticationService,
	UserAuthRequest,
	UserAuthResponse,
} from '../../../base/authentication.service';
import { PayloadUserInterface } from '../../../interfaces/payload-user.interface';
import { AuthCommonService } from '../../../services/auth-common.service';

@Component({
	selector: 'wiki-test-login',
	templateUrl: './test-login.component.html',
	styleUrls: ['./test-login.component.scss'],
})
export class TestLoginComponent implements OnInit, OnDestroy {
	fb: FormBuilder;
	applicationStorage: ApplicationStorageService;
	authentication: AuthenticationService;
	authCommonService: AuthCommonService;

	form: FormGroup;
	username: FormFieldModel;
	password: FormFieldModel;
	rememberme: FormFieldModel;
	optionRememberme: OptionListModel[];
	validations: any = {};

	subLogin: Subscription;
	subLogout: Subscription;
	subSession: Subscription;

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
		fb: FormBuilder,
		applicationStorage: ApplicationStorageService,
		authentication: AuthenticationService,
		authCommonService: AuthCommonService,
	) {
		this.fb = fb;
		this.applicationStorage = applicationStorage;
		this.authentication = authentication;
		this.authCommonService = authCommonService;
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

	login() {
		const raw = this.form.getRawValue();
		const user: UserAuthRequest = {
			username: raw.username,
			password: raw.password,
			rememberme: raw.rememberme === 1 ? true : false,
		};
		this.subLogin = this.authentication.login(user).subscribe((res) => {
			this.userResponse = res;
			this.evalStorage();
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
