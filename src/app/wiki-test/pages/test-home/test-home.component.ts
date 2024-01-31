import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { ApplicationLoggerService, ApplicationStorageService, BasePageComponent } from '@ddc/kit';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'wiki-test-home',
	templateUrl: './test-home.component.html',
	styleUrls: ['./test-home.component.scss'],
})
export class TestHomeComponent extends BasePageComponent {
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
	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		private applicationStorage: ApplicationStorageService,
	) {
		super(applicationLogger, router, activatedRoute);
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

	manageDataParams(data: Data) {}
	manageRouteParams(data: ParamMap) {}
	manageQueryParams(data: ParamMap) {}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'TestHomeComponent';
	}

	home() {
		this.router.navigate(environment.url.home);
	}
}
