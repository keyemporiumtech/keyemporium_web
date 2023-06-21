import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BaseComponent,
	PageUtility,
} from '@ddc/kit';

@Component({
	selector: 'reserve-user-sub-menu',
	templateUrl: './user-sub-menu.component.html',
	styleUrls: ['./user-sub-menu.component.scss'],
})
export class UserSubMenuComponent extends BaseComponent {
	piva: string;
	constructor(
		applicationLogger: ApplicationLoggerService,
		private applicationStorage: ApplicationStorageService,
		private router: Router,
	) {
		super(applicationLogger);
		this.piva = this.applicationStorage.activityPIVA.get();
	}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'UserSubMenuComponent';
	}

	goToProfileManagement(flgActivity?: boolean) {
		const extras: NavigationExtras = {};
		if (flgActivity) {
			extras.queryParams = { PIVA: PageUtility.encodeParam(this.piva) };
		}
		this.router.navigate(['reserve', 'permissions'], extras);
	}
}
