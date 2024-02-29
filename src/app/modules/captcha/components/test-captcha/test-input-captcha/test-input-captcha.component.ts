import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MagicValidatorUtil } from '@ddc/kit';
import { EnumFormType } from '../../../../../shared/enums/form/form-type.enum';
import { FormFieldModel } from '../../../../../shared/models/form/form-field.model';

@Component({
	selector: 'wiki-test-input-captcha',
	templateUrl: './test-input-captcha.component.html',
	styleUrls: ['./test-input-captcha.component.scss'],
})
export class TestInputCaptchaComponent {
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
