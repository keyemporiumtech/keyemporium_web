import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'wiki-test-input-password-async',
	templateUrl: './test-input-password-async.component.html',
	styleUrls: ['./test-input-password-async.component.scss'],
})
export class TestInputPasswordAsyncComponent implements OnInit {
	form: FormGroup;

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			myPassword: [undefined],
		});
	}

	ngOnInit() {}
}
