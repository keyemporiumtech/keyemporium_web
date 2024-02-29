import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MagicValidatorUtil } from '../../../../../kit';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';

@Component({
	selector: 'wiki-test-input-recaptcha',
	templateUrl: './test-input-recaptcha.component.html',
	styleUrls: ['./test-input-recaptcha.component.scss'],
})
export class TestInputRecaptchaComponent {
	formCaptcha: FormGroup;
	validations: any = {};
	field1: FormFieldModel;
	constructor(private fb: FormBuilder) {
		this.formCaptcha = this.fb.group({
			captcha1: new MagicValidatorUtil((this.validations.captcha1 = []), undefined)
				.required()
				.build(),
		});

		this.field1 = new FormFieldModel(
			EnumFormType.TEXT,
			this.formCaptcha.get('captcha1') as FormControl,
			'',
		)
			.validation(this.validations.captcha1)
			.onInit();
	}

	token1: string = '';
	verify1: boolean = false;

	generate1(key: string) {
		this.token1 = key;
	}
	verified1(res: boolean) {
		this.verify1 = res;
	}
}
