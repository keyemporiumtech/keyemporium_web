import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
declare var $: any;
@Component({
	selector: 'wiki-test-pagination',
	templateUrl: './test-pagination.component.html',
	styleUrls: ['./test-pagination.component.scss'],
})
export class TestPaginationComponent implements OnInit {
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
