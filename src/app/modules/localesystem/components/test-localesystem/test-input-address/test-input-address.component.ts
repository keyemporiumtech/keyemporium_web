import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MagicValidatorUtil } from '@ddc/kit';

@Component({
	selector: 'wiki-test-input-address',
	templateUrl: './test-input-address.component.html',
	styleUrls: ['./test-input-address.component.scss'],
})
export class TestInputAddressComponent implements OnInit {
	example: string;

	formAddress: FormGroup;
	validations: any = {};
	constructor(private fb: FormBuilder) {
		this.formAddress = this.fb.group({
			nation: new MagicValidatorUtil((this.validations.nation = []), undefined).build(),
			region: new MagicValidatorUtil((this.validations.region = []), undefined).build(),
			province: new MagicValidatorUtil((this.validations.province = []), undefined).build(),
			community: new MagicValidatorUtil((this.validations.community = []), undefined).build(),
			city: new MagicValidatorUtil((this.validations.city = []), undefined).build(),
			street: new MagicValidatorUtil((this.validations.street = []), undefined).build(),
			num: new MagicValidatorUtil((this.validations.num = []), undefined).build(),
			zip: new MagicValidatorUtil((this.validations.zip = []), undefined).build(),
			geo1: new MagicValidatorUtil((this.validations.geo1 = []), undefined).build(),
			geo2: new MagicValidatorUtil((this.validations.geo2 = []), undefined).build(),
		});
	}

	set(value: string) {
		this.example = value;
	}

	ngOnInit() {}
}
