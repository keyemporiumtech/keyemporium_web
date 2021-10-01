import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	ApplicationLoggerService,
	BaseFormComponent,
	BehaviourObserverModel,
	MagicValidatorUtil,
} from '@ddc/kit';
import { Observable, of } from 'rxjs';
import { TestfkModel } from '../../../cakeutils-be/models/testfk.model';
import { TestfkService } from '../../../cakeutils-be/services/testfk.service';
import { FormGroupModel } from '../../../../../shared/models/form/form-group.model';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { RequestConditionInterface } from '../../../cakeutils/interfaces/request-conditions.interface';
import { TestModel } from '../../../cakeutils-be/models/test.model';

@Component({
	selector: 'wiki-test-api-unique',
	templateUrl: './test-api-unique.component.html',
	styleUrls: ['./test-api-unique.component.scss'],
})
export class TestApiUniqueComponent extends BaseFormComponent {
	@Input() idIn: string;
	groups: FormGroupModel[];
	// controlli
	modelToSave: TestfkModel;
	constructor(
		applicationLogger: ApplicationLoggerService,
		fb: FormBuilder,
		private testfkService: TestfkService,
	) {
		super(applicationLogger, fb);
		this.groups = this.getGroups();
	}

	getForm(): FormGroup {
		return this.fb.group({
			codice: new MagicValidatorUtil((this.validationMessages.codice = []), undefined)
				.required()
				.build(),
			title: new MagicValidatorUtil((this.validationMessages.title = []), undefined)
				.required()
				.build(),
			description: new MagicValidatorUtil(
				(this.validationMessages.description = []),
				undefined,
			).build(),
			codice_fk: new MagicValidatorUtil((this.validationMessages.codice_fk = []), undefined)
				.required()
				.build(),
			title_fk: new MagicValidatorUtil((this.validationMessages.title_fk = []), undefined)
				.required()
				.build(),
			description_fk: new MagicValidatorUtil(
				(this.validationMessages.description_fk = []),
				undefined,
			).build(),
		});
	}
	getValidationMessages() {
		return {};
	}
	setValueChanges() {}
	setLoader() {
		this.disable();
		if (!this.idIn) {
			this.idIn = '1';
		}
	}
	setLoaderAsync(): Observable<boolean> {
		return of(true);
	}
	extractData() {
		const values = this.form.getRawValue();
		const model: TestfkModel = new TestfkModel();
		model.cod = values.codice;
		model.title = values.title;
		model.description = values.description;
		model.test = new TestModel();
		model.test.cod = values.codice_fk;
		model.test.title = values.title_fk;
		model.test.description = values.description_fk;
		return model;
	}
	setModel(): Observable<TestfkModel> {
		if (this.idIn) {
			const conditions: RequestConditionInterface = {
				belongs: ['test_fk'],
				virtualfields: ['test_title'],
				flags: undefined,
				properties: undefined,
			};
			return this.testfkService.getTestfk(this.idIn, undefined, conditions);
		}
		return of(this.model);
	}
	fillForm(form: FormGroup, model: TestfkModel) {
		form.get('codice').setValue(model.cod);
		form.get('title').setValue(model.title);
		form.get('description').setValue(model.description);
		form.get('codice_fk').setValue(model.test ? model.test.cod : undefined);
		form.get('title_fk').setValue(model.test ? model.test.title : undefined);
		form.get('description_fk').setValue(model.test ? model.test.description : undefined);
	}
	setModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: TestfkModel) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterModel(res: any) {}
	getModelFieldForId(): string {
		return 'id';
	}
	saveModel(model: any): Observable<TestfkModel> {
		return of(model);
	}
	updateModel(model: any): Observable<TestfkModel> {
		return of(model);
	}
	saveModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {
			this.modelToSave = undefined;
		};
		const funOk = (res: TestfkModel) => {
			this.modelToSave = res;
		};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterSave(res: any) {}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'TestApiUniqueComponent';
	}

	// COMPONENTE
	getGroups(): FormGroupModel[] {
		const groups: FormGroupModel[] = [];
		groups.push(
			new FormGroupModel().multipleField([
				new FormFieldModel(EnumFormType.TEXT, this.form.get('codice') as FormControl, 'Codice')
					.validation(this.validationMessages.codice)
					.colGroup('4|4|6'),
				new FormFieldModel(EnumFormType.TEXT, this.form.get('title') as FormControl, 'Titolo')
					.validation(this.validationMessages.title)
					.colGroup('8|8|6'),
			]),
			new FormGroupModel().singleField(
				new FormFieldModel(
					EnumFormType.TEXTAREA,
					this.form.get('description') as FormControl,
					'Descrizione',
				).validation(this.validationMessages.description),
			),

			new FormGroupModel().multipleField([
				new FormFieldModel(
					EnumFormType.TEXT,
					this.form.get('codice_fk') as FormControl,
					'Codice FK',
				)
					.validation(this.validationMessages.codice_fk)
					.colGroup('4|4|6'),
				new FormFieldModel(EnumFormType.TEXT, this.form.get('title_fk') as FormControl, 'Titolo FK')
					.validation(this.validationMessages.title_fk)
					.colGroup('8|8|6'),
			]),
			new FormGroupModel().singleField(
				new FormFieldModel(
					EnumFormType.TEXTAREA,
					this.form.get('description_fk') as FormControl,
					'Descrizione FK',
				).validation(this.validationMessages.description_fk),
			),
		);

		return groups;
	}
}
