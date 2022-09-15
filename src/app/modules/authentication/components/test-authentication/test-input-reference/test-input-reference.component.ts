import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MagicValidatorUtil } from '@ddc/kit';
import { EnumContactreferenceType } from '../../../enums/contactreference-type.enum';

@Component({
	selector: 'wiki-test-input-reference',
	templateUrl: './test-input-reference.component.html',
	styleUrls: ['./test-input-reference.component.scss'],
})
export class TestInputReferenceComponent implements OnInit {
	example: string;

	formReference: FormGroup;
	validations: any = {};
	EnumContactreferenceType = EnumContactreferenceType;

	constructor(private fb: FormBuilder) {
		this.formReference = this.fb.group({
			tel: new MagicValidatorUtil((this.validations.tel = []), undefined).build(),
			social: new MagicValidatorUtil((this.validations.social = []), undefined).build(),
			val: new MagicValidatorUtil((this.validations.val = []), undefined).build(),
		});
	}

	set(value: string) {
		this.example = value;
	}

	ngOnInit() {}
}
