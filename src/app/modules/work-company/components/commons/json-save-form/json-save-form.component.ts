import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	ApplicationLoggerService,
	BaseComponent,
	MagicValidatorUtil,
	StringTranslate,
} from '@ddc/kit';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';

@Component({
	selector: 'ddc-init-json-save-form',
	templateUrl: './json-save-form.component.html',
	styleUrls: ['./json-save-form.component.scss'],
})
export class JsonSaveFormComponent extends BaseComponent {
	@Input() labelTitle: string | StringTranslate = 'Title';
	form: FormGroup;
	FLD_title: FormFieldModel;
	validationMessages: any = {};
	@Output() confirmEmit: EventEmitter<any> = new EventEmitter<any>();

	constructor(applicationLogger: ApplicationLoggerService, private fb: FormBuilder) {
		super(applicationLogger);
		this.form = this.fb.group({
			title: new MagicValidatorUtil((this.validationMessages.title = []), undefined)
				.required()
				.build(),
		});
		this.initFields();
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'JsonSaveFormComponent';
	}

	initFields() {
		this.FLD_title = new FormFieldModel(
			EnumFormType.TEXT,
			this.form.get('title') as FormControl,
			this.labelTitle,
		)
			.validation(this.validationMessages.title)
			.onInit();
	}

	confirm() {
		this.confirmEmit.emit({ title: this.form.get('title').value });
	}
}
