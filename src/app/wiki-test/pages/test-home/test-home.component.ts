import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStorageService } from '@ddc/kit';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'wiki-test-home',
	templateUrl: './test-home.component.html',
	styleUrls: ['./test-home.component.scss'],
})
export class TestHomeComponent implements OnInit {
	timezoneServer: string;
	timezoneServerName: string;
	languageCod: string;
	languageName: string;
	currencyCod: string;
	currencyName: string;
	currencySymbol: string;
	nationCod: string;
	nationName: string;
	appTitle: string;
	constructor(private applicationStorage: ApplicationStorageService, private router: Router) {
		this.timezoneServer = localStorage.getItem('timezoneServer');
		this.timezoneServerName = localStorage.getItem('timezoneNameServer');
		this.languageCod = this.applicationStorage.language.get();
		this.languageName = this.applicationStorage.languageName.get();
		this.currencyCod = this.applicationStorage.currency.get();
		this.currencyName = this.applicationStorage.currencyName.get();
		this.currencySymbol = this.applicationStorage.currencySymbol.get();
		this.nationCod = this.applicationStorage.nation.get();
		this.nationName = this.applicationStorage.nationName.get();
		this.appTitle = environment.appName;
	}

	ngOnInit() {}

	home() {
		this.router.navigate(environment.url.home);
	}
}
