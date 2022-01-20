import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'wiki-test-input-creditcard',
	templateUrl: './test-input-creditcard.component.html',
	styleUrls: ['./test-input-creditcard.component.scss'],
})
export class TestInputCreditcardComponent implements OnInit {
	form: FormGroup;

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			myCC: [undefined],
		});
	}

	ngOnInit() {}
}
