import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationLoggerService, BaseComponent } from '@ddc/kit';

@Component({
	selector: 'reserve-user-sub-menu',
	templateUrl: './user-sub-menu.component.html',
	styleUrls: ['./user-sub-menu.component.scss'],
})
export class UserSubMenuComponent extends BaseComponent {
	constructor(applicationLogger: ApplicationLoggerService, private router: Router) {
		super(applicationLogger);
	}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'UserSubMenuComponent';
	}

	goToProfileManagement() {
		this.router.navigate(['reserve', 'permissions']);
	}
}
