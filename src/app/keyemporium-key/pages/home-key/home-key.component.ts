import { Component } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { ApplicationLoggerService, BasePageComponent } from '@ddc/kit';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'key-home-key',
	templateUrl: './home-key.component.html',
	styleUrls: ['./home-key.component.scss'],
})
export class HomeKeyComponent extends BasePageComponent {
	showTest: boolean;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
		this.showTest = environment.name === 'LOCAL';
	}
	manageDataParams(data: Data) {}
	manageRouteParams(data: ParamMap) {}
	manageQueryParams(data: ParamMap) {}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'HomeKeyComponent';
	}
}
