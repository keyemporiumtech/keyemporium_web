import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FileService } from '@ddc/kit';
import { TranslateService } from '@ngx-translate/core';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { TestFormInputsComponent } from '../test-form-inputs/test-form-inputs.component';

@Component({
	selector: 'wiki-test-input-generic',
	templateUrl: './test-input-generic.component.html',
	styleUrls: ['./test-input-generic.component.scss'],
})
export class TestInputGenericComponent extends TestFormInputsComponent {
	colSingle: FormFieldModel;
	appendPrepend: FormFieldModel;
	// fields
	fieldText1: FormFieldModel;
	fieldText2: FormFieldModel;

	constructor(fb: FormBuilder, fileService: FileService, translate: TranslateService) {
		super(fb, fileService, translate);
		this.form1.addControl('colSingle', new FormControl(undefined, [Validators.required]));

		this.colSingle = new FormFieldModel(
			EnumFormType.TEXT,
			this.form1.get('colSingle') as FormControl,
			'Text a colonna',
			'Text a colonna',
		)
			.validation(this.validations.campo1)
			.horizontal('4|4|6', '8|8|6')
			.onInit();

		this.form1.addControl('appendPrepend', new FormControl(undefined, [Validators.required]));

		this.appendPrepend = new FormFieldModel(
			EnumFormType.TEXT,
			this.form1.get('appendPrepend') as FormControl,
			'Text con append e prepend',
		)
			.validation(this.validations.campo1)
			.appendPrepend('@', '€')
			.onInit();

		this.password2 = new FormFieldModel(
			EnumFormType.PASSWORD,
			this.form1.get('password2') as FormControl,
			'Input Password',
		)
			.validation([...this.validations.campo1])
			.setProperties({
				minLength: 5,
				maxLength: 15,
				almostOneNumber: true,
				almostOneLower: true,
				almostOneUpper: true,
			})
			.onInit();
	}
}
