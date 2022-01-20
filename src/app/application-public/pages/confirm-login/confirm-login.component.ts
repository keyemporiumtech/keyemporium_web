import { Component } from '@angular/core';
import {
	BaseFormComponent,
	ApplicationLoggerService,
	BehaviourObserverModel,
	MagicValidatorUtil,
} from '@ddc/kit';
import { FormFieldModel } from '../../../shared/models/form/form-field.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
	AuthenticationService,
	UserAuthResponse,
} from '../../../modules/authentication/base/authentication.service';
import { Observable, of } from 'rxjs';
import { EnumFormType } from '../../../shared/enums/form/form-type.enum';

@Component({
	selector: 'public-confirm-login',
	templateUrl: './confirm-login.component.html',
	styleUrls: ['./confirm-login.component.scss'],
})
export class ConfirmLoginComponent extends BaseFormComponent {
	// fields
	FLD_pin: FormFieldModel;

	constructor(
		applicationLogger: ApplicationLoggerService,
		fb: FormBuilder,
		private router: Router,
		private authenticationService: AuthenticationService,
	) {
		super(applicationLogger, fb);
		this.initFields();
	}

	getForm(): FormGroup {
		return this.fb.group({
			pin: new MagicValidatorUtil((this.validationMessages.pin = []), undefined).required().build(),
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
	extractData(): any {
		const values = this.form.getRawValue();
		const model: any = {};
		model.pin = values.pin;
		return model;
	}

	setModel(): Observable<any> {
		return of({});
	}
	fillForm(form: FormGroup, model: any) {
		form.get('pin').setValue(model.pin);
	}
	setModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: any) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterModel(res: any) {}
	getModelFieldForId(): string {
		return 'pin';
	}
	saveModel(model: any): Observable<UserAuthResponse> {
		return this.authenticationService.verifyPin(model.pin);
	}
	updateModel(model: any): Observable<any> {
		return of(model);
	}
	saveModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: UserAuthResponse) => {
			if (res) {
				this.router.navigate(['reserve']);
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
		return 'ConfirmLoginComponent';
	}

	// COMPONENTE
	initFields() {
		this.FLD_pin = new FormFieldModel(
			EnumFormType.PASSWORD,
			this.form.get('pin') as FormControl,
			'PERSONAL.CONFIRM_LOGIN.PIN',
		)
			.validation(this.validationMessages.pin)
			.onInit();
	}
}
