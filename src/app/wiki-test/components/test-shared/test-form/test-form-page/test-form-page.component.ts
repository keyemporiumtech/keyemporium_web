import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MagicValidatorUtil } from '@ddc/kit';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldPageModel } from '../../../../../shared/models/form/form-field-page.model';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';
import { FormGroupModel } from '../../../../../shared/models/form/form-group.model';

@Component({
	selector: 'wiki-test-form-page',
	templateUrl: './test-form-page.component.html',
	styleUrls: ['./test-form-page.component.scss'],
})
export class TestFormPageComponent implements OnInit {
	form1: FormGroup;
	validations1: any = {};
	validations2: any = {};
	// fields
	groups1: FormGroupModel[] = [];
	groups2: FormGroupModel[] = [];

	constructor(private fb: FormBuilder) {
		this.form1 = this.fb.group({
			row1: new MagicValidatorUtil((this.validations1.row1 = []), undefined).required().build(),
			row2A: new MagicValidatorUtil((this.validations1.row2A = []), undefined)
				.required()
				.isInteger()
				.build(),
			row2B: new MagicValidatorUtil((this.validations1.row2B = []), undefined).build(),
			row3A: new MagicValidatorUtil((this.validations1.row3A = []), undefined).required().build(),
			row3B: new MagicValidatorUtil((this.validations1.row3B = []), undefined).required().build(),
			row4: new MagicValidatorUtil((this.validations1.row4 = []), undefined).required().build(),
		});

		this.groups1.push(
			new FormGroupModel().singleField(
				new FormFieldModel(
					EnumFormType.TEXT,
					this.form1.get('row1') as FormControl,
					'Riga 1 - Campo 1',
				).validation(this.validations1.row1),
			),

			new FormGroupModel().multipleField(
				[
					new FormFieldModel(
						EnumFormType.NUMBER,
						this.form1.get('row2A') as FormControl,
						'Riga 2 - Campo 1',
					).validation(this.validations1.row2A),
					new FormFieldModel(
						EnumFormType.TEXT,
						this.form1.get('row2B') as FormControl,
						'Riga 2 - Campo 2',
					).validation(this.validations1.row2B),
				],
				'6|6|6',
			),

			new FormGroupModel().multipleField([
				new FormFieldModel(
					EnumFormType.TEXT,
					this.form1.get('row3A') as FormControl,
					'Riga 3 - Campo 1',
				)
					.validation(this.validations1.row2A)
					.colGroup('4|4|6'),
				new FormFieldModel(
					EnumFormType.TEXT,
					this.form1.get('row3B') as FormControl,
					'Riga 3 - Campo 2',
				)
					.validation(this.validations1.row3B)
					.colGroup('8|8|6'),
			]),

			new FormGroupModel().singleField(
				new FormFieldModel(
					EnumFormType.TEXT,
					this.form1.get('row4') as FormControl,
					'Riga 4 - Campo 1',
				).validation(this.validations1.row4),
				'6|6|12',
			),
		);

		// FORM AUTOMATICO
		this.groups2.push(
			new FormGroupModel().single(
				new FormFieldPageModel(
					'row1',
					new MagicValidatorUtil((this.validations2.row1 = []), undefined).required(),
					new FormFieldModel(EnumFormType.TEXT, undefined, 'Riga 1 - Campo 1'),
				),
			),

			new FormGroupModel().multiple(
				[
					new FormFieldPageModel(
						'row2A',
						new MagicValidatorUtil((this.validations2.row2A = []), undefined)
							.required()
							.isInteger(),
						new FormFieldModel(EnumFormType.NUMBER, undefined, 'Riga 2 - Campo 1'),
					),
					new FormFieldPageModel(
						'row2B',
						new MagicValidatorUtil((this.validations2.row2B = []), undefined),
						new FormFieldModel(EnumFormType.TEXT, undefined, 'Riga 2 - Campo 2'),
					),
				],
				'6|6|6',
			),

			new FormGroupModel().multiple([
				new FormFieldPageModel(
					'row3A',
					new MagicValidatorUtil((this.validations2.row3A = []), undefined).required().isInteger(),
					new FormFieldModel(EnumFormType.TEXT, undefined, 'Riga 3 - Campo 1').colGroup('4|4|6'),
				),
				new FormFieldPageModel(
					'row3B',
					new MagicValidatorUtil((this.validations2.row3B = []), undefined),
					new FormFieldModel(EnumFormType.TEXT, undefined, 'Riga 3 - Campo 2').colGroup('8|8|6'),
				),
			]),

			new FormGroupModel().single(
				new FormFieldPageModel(
					'row4',
					new MagicValidatorUtil((this.validations2.row4 = []), undefined).required(),
					new FormFieldModel(EnumFormType.TEXT, undefined, 'Riga 4 - Campo 1'),
				),
				'6|6|12',
			),
		);
	}

	ngOnInit() {}
}
