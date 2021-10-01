import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	ApplicationLoggerService,
	BaseFormComponent,
	BehaviourObserverModel,
	MagicValidatorUtil,
} from '@ddc/kit';
import { Observable, of } from 'rxjs';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { FormGroupModel } from '../../../../../shared/models/form/form-group.model';
import { RequestConditionInterface } from '../../../../api/cakeutils/interfaces/request-conditions.interface';
import { MimetypeModel } from '../../../models/mimetype.model';
import { MimetypeService } from '../../../services/mimetype.service';

@Component({
	selector: 'wiki-test-mimetype-unique',
	templateUrl: './test-mimetype-unique.component.html',
	styleUrls: ['./test-mimetype-unique.component.scss'],
})
export class TestMimetypeUniqueComponent extends BaseFormComponent {
	@Input() idIn: string;
	groups: FormGroupModel[];
	// controlli
	modelToSave: MimetypeModel;

	constructor(
		applicationLogger: ApplicationLoggerService,
		fb: FormBuilder,
		private mimetypeService: MimetypeService,
	) {
		super(applicationLogger, fb);
		this.groups = this.getGroups();
	}

	getForm(): FormGroup {
		return this.fb.group({
			ext: new MagicValidatorUtil((this.validationMessages.ext = []), undefined).build(),
			value: new MagicValidatorUtil((this.validationMessages.value = []), undefined).build(),
			type: new MagicValidatorUtil((this.validationMessages.type = []), undefined).build(),
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
		const model: MimetypeModel = new MimetypeModel();
		model.ext = values.ext;
		model.value = values.value;
		model.type = values.type;
		return model;
	}
	setModel(): Observable<MimetypeModel> {
		if (this.idIn) {
			const conditions: RequestConditionInterface = {
				belongs: undefined,
				virtualfields: undefined,
				flags: undefined,
				properties: undefined,
			};

			return this.mimetypeService.unique(this.idIn, undefined, undefined, conditions);
		}
		return of(this.model);
	}
	fillForm(form: FormGroup, model: MimetypeModel) {
		form.get('ext').setValue(model.ext);
		form.get('value').setValue(model.value);
		form.get('type').setValue(model.type);
	}
	setModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: MimetypeModel) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}
	afterModel(res: any) {}
	getModelFieldForId(): string {
		return 'id';
	}
	saveModel(model: any): Observable<MimetypeModel> {
		return of(model);
	}
	updateModel(model: any): Observable<MimetypeModel> {
		return of(model);
	}
	saveModelBehaviour(): BehaviourObserverModel {
		const funPre = () => {
			this.modelToSave = undefined;
		};
		const funOk = (res: MimetypeModel) => {
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
		return 'TestMimetypeUniqueComponent';
	}

	// COMPONENTE
	getGroups(): FormGroupModel[] {
		const groups: FormGroupModel[] = [];
		groups.push(
			new FormGroupModel().multipleField([
				new FormFieldModel(EnumFormType.TEXT, this.form.get('ext') as FormControl, 'Estensione')
					.validation(this.validationMessages.ext)
					.colGroup('4|4|12'),
				new FormFieldModel(EnumFormType.TEXT, this.form.get('value') as FormControl, 'Mimetype')
					.validation(this.validationMessages.value)
					.colGroup('4|4|12'),
				new FormFieldModel(EnumFormType.TEXT, this.form.get('type') as FormControl, 'Tipo')
					.validation(this.validationMessages.type)
					.colGroup('4|4|12'),
			]),
		);

		return groups;
	}
}
