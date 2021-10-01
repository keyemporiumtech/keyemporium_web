import { Component, OnInit } from '@angular/core';
import { ApplicationStorageService } from '@ddc/kit';

@Component({
	selector: 'wiki-test-app-nations',
	templateUrl: './test-app-nations.component.html',
	styleUrls: ['./test-app-nations.component.scss'],
})
export class TestAppNationsComponent implements OnInit {
	nationCod: string;
	nationName: string;

	constructor(private applicationStorage: ApplicationStorageService) {
		this.resolveCurrent();
	}

	ngOnInit() {}

	resolveCurrent() {
		this.nationCod = this.applicationStorage.nation.get();
		this.nationName = this.applicationStorage.nationName.get();
	}
}
