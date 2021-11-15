import { Component } from '@angular/core';
import {
	BaseFormComponent,
	ApplicationLoggerService,
	MagicValidatorUtil,
	BehaviourObserverModel,
	OptionListModel,
} from '@ddc/kit';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormFieldModel } from '../../../shared/models/form/form-field.model';
import { Observable, of } from 'rxjs';
import { EnumFormType } from '../../../shared/enums/form/form-type.enum';

@Component({
	selector: 'public-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseFormComponent {
	// fields
	FLD_email: FormFieldModel;
	FLD_password: FormFieldModel;
	FLD_remember: FormFieldModel;
	optionRemeber: OptionListModel[];

	constructor(applicationLogger: ApplicationLoggerService, fb: FormBuilder) {
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
	extractData() {
		const values = this.form.getRawValue();
		const model: any = {};
		model.email = values.email;
		model.password = values.password;
		model.remember = values.remember && values.remember === 1 ? true : false;
		return model;
	}

	setModel(): Observable<any> {
		return of({});
	}
	fillForm(form: FormGroup, model: any) {
		form.get('email').setValue(model.email);
		form.get('password').setValue(model.password);
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
	saveModel(model: any): Observable<any> {
		console.error(model);
		return of(model);
	}
	updateModel(model: any): Observable<any> {
		return of(model);
	}
	saveModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: any) => {};
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
		this.FLD_password = new FormFieldModel(
			EnumFormType.PASSWORD,
			this.form.get('password') as FormControl,
			'PERSONAL.LABEL.PASSWORD',
		)
			.validation(this.validationMessages.password)
			.onInit();
		this.FLD_remember = new FormFieldModel(
			EnumFormType.CHECKBOX,
			this.form.get('remember') as FormControl,
			'PERSONAL.LOGIN.REMEMBERME',
		)
			.validation(this.validationMessages.remember)
			.onInit();
	}
}
