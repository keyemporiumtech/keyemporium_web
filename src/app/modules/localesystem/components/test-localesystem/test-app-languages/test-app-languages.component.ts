import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ApplicationStorageService } from '@ddc/kit';

@Component({
	selector: 'wiki-test-app-languages',
	templateUrl: './test-app-languages.component.html',
	styleUrls: ['./test-app-languages.component.scss'],
})
export class TestAppLanguagesComponent implements OnInit {
	filtersEnv: string[];
	languageCod: string;
	languageName: string;

	constructor(private applicationStorage: ApplicationStorageService) {
		this.filtersEnv = environment.default.languages;
		this.resolveCurrent();
	}

	ngOnInit() {}

	resolveCurrent() {
		this.languageCod = this.applicationStorage.language.get();
		this.languageName = this.applicationStorage.languageName.get();
	}
}
