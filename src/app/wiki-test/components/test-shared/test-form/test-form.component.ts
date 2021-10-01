import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
declare var $: any;
@Component({
	selector: 'wiki-test-form',
	templateUrl: './test-form.component.html',
	styleUrls: ['./test-form.component.scss'],
})
export class TestFormComponent implements OnInit {
	box: string;
	collapsed: string;
	constructor(private fb: FormBuilder) {}

	ngOnInit() {}

	openCloseBox(name: string, collapseId: string) {
		if (this.box === name) {
			this.box = undefined;
			$('#' + collapseId).collapse('hide');
			this.collapsed = undefined;
		} else {
			this.box = name;
			if (this.collapsed) {
				$('#' + this.collapsed).collapse('hide');
			}
			$('#' + collapseId).collapse('show');
			this.collapsed = collapseId;
		}
	}
}
