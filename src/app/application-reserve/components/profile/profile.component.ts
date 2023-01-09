import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
	BaseFormComponent,
	OptionListModel,
	ApplicationLoggerService,
	MagicValidatorUtil,
	BehaviourObserverModel,
	EnumFormMode,
} from '@ddc/kit';
import { FormFieldModel } from '../../../shared/models/form/form-field.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../modules/authentication/services/user.service';
import { Observable, of } from 'rxjs';
import { TypologicalUtility } from '../../../application-shared/utility/Typological.utility';
import { UserModel } from '../../../modules/authentication/models/user.model';
import { UserConverter } from '../../../modules/authentication/converters/user.converter';
import { EnumFormType } from '../../../shared/enums/form/form-type.enum';

@Component({
	selector: 'reserve-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseFormComponent {
	@Input() id_user: string;
	@Input() blocked: boolean;
	@Input() viewmode: boolean = true;
	@Output() emitViewMode: EventEmitter<boolean> = new EventEmitter<boolean>();
	// fields
	FLD_email: FormFieldModel;
	FLD_name: FormFieldModel;
	FLD_surname: FormFieldModel;
	FLD_sex: FormFieldModel;
	FLD_born: FormFieldModel;
	optionsSex: OptionListModel[] = [];

	// @ViewChild('pwd1') pwd1: InputPasswordAsyncComponent;

	constructor(
		applicationLogger: ApplicationLoggerService,
		fb: FormBuilder,
		private userService: UserService,
	) {
		super(applicationLogger, fb);
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
	setValueChanges() {}
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
		form.get('born').setValue(model.bornModel.toString('YYYY-MM-DD'));
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
		model.id = this.id_user;
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
		const funOk = (res: string) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterSave(res: any) {}
	ngOnInitForChildren() {
		if (this.blocked) {
			this.changeViewMode(true, true);
		} else if (this.viewmode) {
			this.changeViewMode(true, true);
		}
	}
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

	changeViewMode(val: boolean, notload?: boolean) {
		if (val) {
			super.changeMode(EnumFormMode.DETAIL);
			if (!notload) {
				this.reloadModel();
			}
		} else {
			super.changeMode(EnumFormMode.UPDATE);
		}
		this.viewmode = val;
		this.emitViewMode.emit(this.viewmode);
	}
}
