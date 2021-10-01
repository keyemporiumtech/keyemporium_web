import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApplicationLoggerService, BaseComponent } from '@ddc/kit';
import { FormGroupModel } from '../../models/form/form-group.model';

@Component({
	selector: 'ddc-init-form-page',
	templateUrl: './form-page.component.html',
	styleUrls: ['./form-page.component.scss'],
})
export class FormPageComponent extends BaseComponent {
	@Input() flgOnInitValidation?: boolean;
	@Input() flgOnSubmitValidation?: boolean;
	@Input() submitted?: boolean;
	@Input() form: FormGroup;
	private _groups: FormGroupModel[];
	@Input() set groups(val: FormGroupModel[]) {
		this._groups = val;
		if (val && val.length) {
			this.initGroups(val);
		}
	}
	get groups(): FormGroupModel[] {
		return this._groups;
	}

	constructor(applicationLogger: ApplicationLoggerService, private fb: FormBuilder) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		if (!this.form && this.groups) {
			this.initFormByGroups(this.groups);
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'FormPageComponent';
	}

	// groups
	initGroups(groups: FormGroupModel[]) {
		groups.forEach((group) => {
			group.fields.forEach((field) => {
				field.flgOnInitValidation = this.flgOnInitValidation;
				field.flgOnSubmitValidation = this.flgOnSubmitValidation;
				field.submitted = () => {
					return this.submitted;
				};
			});
		});
	}
	initFormByGroups(groups: FormGroupModel[]) {
		this.form = this.fb.group({});
		groups.forEach((group) => {
			group.fieldsPage.forEach((fieldPage) => {
				this.form.addControl(fieldPage.name, fieldPage.magicValidator.buildControl());
				fieldPage.field.formControl = this.form.get(fieldPage.name) as FormControl;
			});
		});
	}
}
