import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Component({
	selector: 'wiki-test-input-multilanguage',
	templateUrl: './test-input-multilanguage.component.html',
	styleUrls: ['./test-input-multilanguage.component.scss'],
})
export class TestInputMultilanguageComponent implements OnInit {
	filtersEnv: string[];
	constructor() {
		this.filtersEnv = environment.default.languages;
	}

	ngOnInit() {}
}
