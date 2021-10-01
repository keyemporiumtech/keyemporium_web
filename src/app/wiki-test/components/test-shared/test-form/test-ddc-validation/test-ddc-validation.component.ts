import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators, CustomValidatorsMessages } from '@ddc/kit';
import { FormInputValidationStyleInterface } from '../../../../../shared/interfaces/form/form-input-validation-style.interface';

@Component({
	selector: 'wiki-test-ddc-validation',
	templateUrl: './test-ddc-validation.component.html',
	styleUrls: ['./test-ddc-validation.component.scss'],
})
export class TestDdcValidationComponent implements OnInit {
	form1: FormGroup;
	validations: any;
	validationStyle1: FormInputValidationStyleInterface;
	validationStyle2: FormInputValidationStyleInterface;
	submitted1: boolean;
	constructor(private fb: FormBuilder) {
		this.form1 = this.fb.group({
			campo1: [undefined, [Validators.required, CustomValidators.isInteger]],
			campo2: [undefined, [Validators.required]],
			campo3: [undefined, [Validators.required]],
			campo4: [undefined, [Validators.required]],
			campo5: [undefined, []],
			campo6: [undefined, [Validators.required]],
			campo7: [undefined, [Validators.required, CustomValidators.isInteger]],
			campo8: [undefined, [Validators.required, CustomValidators.isInteger]],
		});
		this.validations = {
			campo1: [
				{
					type: 'required',
					message: 'VALIDATION.REQUIRED',
				},
				CustomValidatorsMessages.IS_INTEGER(),
			],
			campo2: [
				{
					type: 'required',
					message: 'VALIDATION.REQUIRED',
				},
			],
		};
	}

	ngOnInit() {
		this.validationStyle1 = {
			condition: (control: FormControl) => {
				return +control.value === 1;
			},
			color: 'GoldenRod',
			icon: 'fa fa-exclamation-triangle',
			message: (control: FormControl) => 'prova validatore',
		};

		this.validationStyle2 = {
			condition: (control: FormControl) => {
				return +control.value === 2 || +control.value === 3;
			},
			color: 'darkblue',
			icon: 'fa fa-info',
			message: (control: FormControl) => {
				return 'condizione rispettata con valore ' + control.value;
			},
		};
	}

	onSubmit1() {
		this.submitted1 = true;
	}
	onReset1() {
		this.submitted1 = false;
	}
}
