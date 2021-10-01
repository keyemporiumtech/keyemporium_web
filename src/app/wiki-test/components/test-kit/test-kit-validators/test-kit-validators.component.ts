import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MagicValidatorUtil } from '@ddc/kit';

@Component({
	selector: 'wiki-test-kit-validators',
	templateUrl: './test-kit-validators.component.html',
	styleUrls: ['./test-kit-validators.component.scss'],
})
export class TestKitValidatorsComponent implements OnInit {
	form1: FormGroup;
	validations: any = {};

	constructor(private fb: FormBuilder) {
		this.form1 = this.fb.group({
			campo1: new MagicValidatorUtil((this.validations.campo1 = []), 'ciao')
				.required()
				.isInteger()
				.build(),
			campo2: new MagicValidatorUtil((this.validations.campo2 = []), 1)
				.required()
				.isInteger()
				.min(2)
				.max(6)
				.build(),
		});
	}

	ngOnInit() {
		console.error(Object.keys(Validators.required));
	}
}
