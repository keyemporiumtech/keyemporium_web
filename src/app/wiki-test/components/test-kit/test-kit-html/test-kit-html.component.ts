import { Component, OnInit } from '@angular/core';
import { TypCssLoading } from '@ddc/kit';

@Component({
	selector: 'wiki-test-kit-html',
	templateUrl: './test-kit-html.component.html',
	styleUrls: ['./test-kit-html.component.scss'],
})
export class TestKitHtmlComponent implements OnInit {
	background: string;
	// loading
	TypCssLoading = TypCssLoading;
	loading1: boolean;
	loading2: boolean;
	loading3: boolean;
	loading4: boolean;
	loading5: boolean;
	loading6: boolean;
	loading7: boolean;
	loading8: boolean;
	loading9: boolean;
	loading10: boolean;
	loading11: boolean;

	constructor() {}

	ngOnInit() {}

	// loading
	startTypeLoading(num: number) {
		this['loading' + num] = true;
		setTimeout(() => {
			this['loading' + num] = false;
		}, 3000);
	}
}
