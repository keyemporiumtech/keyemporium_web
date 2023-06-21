import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	ApplicationLoggerService,
	BaseFormComponent,
	BehaviourObserverModel,
	EnumFormMode,
	MagicValidatorUtil,
} from '@ddc/kit';
import { Observable, of } from 'rxjs';
import { ProfileConverter } from '../../../../modules/authentication/converters/profile.converter';
import { ProfileModel } from '../../../../modules/authentication/models/profile.model';
import { ProfileService } from '../../../../modules/authentication/services/profile.service';
import { EnumFormType } from '../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../shared/models/form/form-field.model';

@Component({
	selector: 'reserve-role-detail',
	templateUrl: './role-detail.component.html',
	styleUrls: ['./role-detail.component.scss'],
})
export class RoleDetailComponent extends BaseFormComponent {
	@Input() id_profile: string;
	@Input() hideButtons: EnumFormMode;
	@Input() blocked: boolean;
	@Input() viewmode: boolean = true;
	@Input() modeIn: EnumFormMode;
	@Output() emitViewMode: EventEmitter<boolean> = new EventEmitter<boolean>();
	// fields
	FLD_cod: FormFieldModel;
	FLD_name: FormFieldModel;
	FLD_description: FormFieldModel;

	constructor(
		applicationLogger: ApplicationLoggerService,
		fb: FormBuilder,
		private profileService: ProfileService,
	) {
		super(applicationLogger, fb);
		this.initFields();
	}

	getForm(): FormGroup {
		return this.fb.group({
			cod: new MagicValidatorUtil((this.validationMessages.cod = []), undefined).required().build(),
			name: new MagicValidatorUtil((this.validationMessages.name = []), undefined)
				.required()
				.build(),
			description: new MagicValidatorUtil(
				(this.validationMessages.description = []),
				undefined,
			).build(),
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
	setModel(): Observable<ProfileModel> {
		if (this.id_profile) {
			return this.profileService.unique(this.id_profile);
		}
		return of(new ProfileConverter().getEmptyModel());
	}
	fillForm(form: FormGroup, model: ProfileModel) {
		form.get('cod').setValue(model.cod);
		form.get('name').setValue(model.name);
		form.get('description').setValue(model.description);
	}
	setModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: any) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterModel(res: ProfileModel) {
		if (this.modeIn) {
			this.viewmode = this.modeIn === EnumFormMode.DETAIL ? true : false;
			super.changeMode(this.modeIn);
		}
	}
	getModelFieldForId(): string {
		return 'id';
	}

	extractData(): ProfileModel {
		const values = this.form.getRawValue();
		const model: ProfileModel = this.model;
		model.id = this.id_profile;
		model.cod = values.cod;
		model.name = values.name;
		model.description = values.description;
		return model;
	}

	saveModel(model: ProfileModel): Observable<string> {
		return this.profileService.save(model);
	}
	updateModel(model: ProfileModel): Observable<any> {
		return this.profileService.edit(model, model.id);
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
		this.FLD_cod = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('cod') as FormControl,
			'PERSONAL.PROFILE.LABEL.COD',
		)
			.validation(this.validationMessages.cod)
			.onInit();

		this.FLD_name = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('name') as FormControl,
			'PERSONAL.PROFILE.LABEL.NAME',
		)
			.validation(this.validationMessages.name)
			.onInit();

		this.FLD_description = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('description') as FormControl,
			'PERSONAL.PROFILE.LABEL.DESCRIPTION',
		)
			.validation(this.validationMessages.description)
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
