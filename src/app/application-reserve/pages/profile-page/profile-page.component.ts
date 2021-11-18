import { Component, ViewChild } from '@angular/core';
import {
	BaseFormComponent,
	ApplicationLoggerService,
	MagicValidatorUtil,
	ApplicationStorageService,
	OptionListModel,
	RouteNavigationUtility,
	PageUtility,
	BehaviourObserverModel,
} from '@ddc/kit';
import { FormFieldModel } from '../../../shared/models/form/form-field.model';
import { InputPasswordAsyncComponent } from '../../../modules/validator-password/components/input-password-async/input-password-async.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EnumFormType } from '../../../shared/enums/form/form-type.enum';
import { of, Observable, Subscription } from 'rxjs';
import { TypologicalUtility } from '../../../application-shared/utility/Typological.utility';
import { UserModel } from '../../../modules/authentication/models/user.model';
import { UserService } from '../../../modules/authentication/services/user.service';
import { UserConverter } from '../../../modules/authentication/converters/user.converter';
import { AuthenticationService } from '../../../modules/authentication/base/authentication.service';
import { EnumPermissions } from '../../../application-shared/constants/permissions.enum';

@Component({
	selector: 'reserve-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent extends BaseFormComponent {
	// fields
	FLD_image: FormFieldModel;
	FLD_email: FormFieldModel;
	FLD_name: FormFieldModel;
	FLD_surname: FormFieldModel;
	FLD_sex: FormFieldModel;
	FLD_born: FormFieldModel;
	optionsSex: OptionListModel[] = [];
	// objects
	routeUtil: RouteNavigationUtility;
	// var
	id_user: string;
	idUserLogged: string;
	// sub

	// @ViewChild('pwd1') pwd1: InputPasswordAsyncComponent;

	constructor(
		applicationLogger: ApplicationLoggerService,
		fb: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private applicationStorage: ApplicationStorageService,
		private userService: UserService,
		private authenticationService: AuthenticationService,
	) {
		super(applicationLogger, fb);
		this.routeUtil = new RouteNavigationUtility(router, activatedRoute);
		this.idUserLogged = this.applicationStorage.userId.get();
		this.initFields();
	}

	getForm(): FormGroup {
		return this.fb.group({
			email: new MagicValidatorUtil((this.validationMessages.email = []), undefined)
				.required()
				.email()
				.build(),
			name: new MagicValidatorUtil((this.validationMessages.name = []), undefined)
				.required()
				.build(),
			surname: new MagicValidatorUtil((this.validationMessages.surname = []), undefined)
				.required()
				.build(),
			sex: new MagicValidatorUtil((this.validationMessages.sex = []), undefined).required().build(),
			born: new MagicValidatorUtil((this.validationMessages.born = []), undefined)
				.required()
				.isDate()
				.mustBeLessOrEqualThanCurrent()
				.build(),
		});
	}
	getValidationMessages() {
		return {};
	}
	setValueChanges() {
		const idUserParam = PageUtility.decodeParam(this.routeUtil.snapshot.paramMap.get('ID_USER'));
		if (!idUserParam) {
			this.id_user = this.idUserLogged;
		} else if (
			idUserParam !== this.idUserLogged &&
			!this.authenticationService.checkPermissions([
				EnumPermissions.SUPERVISOR,
				EnumPermissions.ALL_PROFILES,
			])
		) {
			this.readonly = true;
		} else {
			this.id_user = idUserParam;
		}
	}
	setLoader() {}
	setLoaderAsync(): Observable<boolean> {
		this.optionsSex = TypologicalUtility.getSexOptions();
		return of(true);
	}
	setModel(): Observable<UserModel> {
		if (this.id_user) {
			return this.userService.unique(this.id_user);
		}
		return of(new UserConverter().getEmptyModel());
	}
	fillForm(form: FormGroup, model: UserModel) {
		form.get('email').setValue(model.username);
		form.get('name').setValue(model.name);
		form.get('surname').setValue(model.surname);
		form.get('sex').setValue(model.sex);
		form.get('born').setValue(model.born);
		/*
		if (this.pwd1 && this.pwd1.formPassword && this.pwd1.formPassword.get('password')) {
			this.pwd1.formPassword.get('password').setValue(model.password);
		}
    */
	}
	setModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: any) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterModel(res: any) {}
	getModelFieldForId(): string {
		return 'id';
	}

	extractData(): UserModel {
		const values = this.form.getRawValue();
		const model: UserModel = this.model;
		model.username = values.email;
		model.name = values.name;
		model.surname = values.surname;
		model.sex = values.sex;
		model.born = values.born;
		return model;
	}

	saveModel(model: UserModel): Observable<string> {
		return this.userService.save(model);
	}
	updateModel(model: UserModel): Observable<any> {
		return this.userService.edit(model, model.id);
	}
	saveModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: boolean) => {
			if (res) {
				this.router.navigate(['app', 'confirm_login']);
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
		return 'ProfilePageComponent';
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

		this.FLD_name = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('name') as FormControl,
			'PERSONAL.LABEL.NAME',
		)
			.validation(this.validationMessages.name)
			.onInit();

		this.FLD_surname = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('surname') as FormControl,
			'PERSONAL.LABEL.SURNAME',
		)
			.validation(this.validationMessages.surname)
			.onInit();

		this.FLD_sex = new FormFieldModel(
			EnumFormType.SELECT,
			this.form.get('sex') as FormControl,
			'PERSONAL.LABEL.SEX',
		)
			.validation(this.validationMessages.sex)
			.onInit();

		this.FLD_born = new FormFieldModel(
			EnumFormType.DATE,
			this.form.get('born') as FormControl,
			'PERSONAL.LABEL.BORN',
		)
			.validation(this.validationMessages.born)
			.onInit();
	}
}
