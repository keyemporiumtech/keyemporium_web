import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BaseFormComponent,
	BehaviourObserverModel,
	MagicValidatorUtil,
	OptionListModel,
} from '@ddc/kit';
import { EnumOauthLoginType, SocialLoginService } from '@ddc/rest';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
	AuthenticationService,
	UserAuthRequest,
} from '../../../modules/authentication/base/authentication.service';
import { ConfirmoperationRequest } from '../../../modules/authentication/dtos/confirmoperation-request';
import { InputPasswordAsyncComponent } from '../../../modules/validator-password/components/input-password-async/input-password-async.component';
import { EnumFormType } from '../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../shared/models/form/form-field.model';

@Component({
	selector: 'public-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseFormComponent {
	// fields
	FLD_email: FormFieldModel;
	FLD_remember: FormFieldModel;
	optionRemeber: OptionListModel[];
	@ViewChild('pwd1') pwd1: InputPasswordAsyncComponent;

	constructor(
		applicationLogger: ApplicationLoggerService,
		fb: FormBuilder,
		private router: Router,
		private applicationStorage: ApplicationStorageService,
		private oauthService: SocialLoginService,
		private authenticationService: AuthenticationService,
	) {
		super(applicationLogger, fb);
		this.initFields();
		this.optionRemeber = [new OptionListModel(1, 'PERSONAL.LOGIN.REMEMBERME')];
	}

	getForm(): FormGroup {
		return this.fb.group({
			email: new MagicValidatorUtil((this.validationMessages.email = []), undefined)
				.required()
				.email()
				.build(),
			password: new MagicValidatorUtil((this.validationMessages.password = []), undefined)
				.required()
				.build(),
			remember: new MagicValidatorUtil((this.validationMessages.remember = []), undefined).build(),
		});
	}
	getValidationMessages() {
		return {};
	}
	setValueChanges() {}
	setLoader() {}
	setLoaderAsync(): Observable<boolean> {
		return of(true);
	}
	extractData(): UserAuthRequest {
		const values = this.form.getRawValue();
		const model: UserAuthRequest = {};
		model.username = values.email;
		model.password = values.password;
		model.rememberme = values.remember && values.remember === 1 ? true : false;
		const confirm: ConfirmoperationRequest = {};
		confirm.flgemail = 1;
		model.confirm = confirm;
		return model;
	}

	setModel(): Observable<any> {
		return of({});
	}
	fillForm(form: FormGroup, model: any) {
		form.get('email').setValue(model.email);
		if (this.pwd1 && this.pwd1.formPassword && this.pwd1.formPassword.get('password')) {
			this.pwd1.formPassword.get('password').setValue(model.password);
		}
		form.get('remember').setValue(model.remember);
	}
	setModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: any) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterModel(res: any) {}
	getModelFieldForId(): string {
		return 'email';
	}
	saveModel(model: UserAuthRequest): Observable<boolean> {
		return environment.name === 'LOCAL'
			? this.authenticationService.login(model).pipe(map((res) => (res ? true : false)))
			: this.authenticationService.loginPin(model, model.confirm);
	}
	updateModel(model: any): Observable<any> {
		return of(model);
	}
	saveModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: boolean) => {
			if (res) {
				this.applicationStorage.passauthtoken.set('1');
				environment.name === 'LOCAL'
					? this.router.navigate(['reserve'])
					: this.router.navigate(['app', 'confirm_login']);
			}
		};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterSave(res: any) {}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}

	getClassName(): string {
		return 'LoginComponent';
	}

	// COMPONENTE
	initFields() {
		this.FLD_email = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('email') as FormControl,
			'PERSONAL.LABEL.EMAIL',
		)
			.validation(this.validationMessages.email)
			.onInit();

		this.FLD_remember = new FormFieldModel(
			EnumFormType.CHECKBOX,
			this.form.get('remember') as FormControl,
			'PERSONAL.LOGIN.REMEMBERME',
		)
			.validation(this.validationMessages.remember)
			.onInit();
	}

	// SOCIAL
	signInGoogle() {
		this.oauthService.signIn(EnumOauthLoginType.GOOGLE);
	}

	signInFacebook() {
		this.oauthService.signIn(EnumOauthLoginType.FACEBOOK);
	}
}
