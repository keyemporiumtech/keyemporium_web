import { Component } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import {
	ApplicationLoggerService,
	BasePageComponent,
	PreviousRouteService,
	RouteUrlModel,
} from '@ddc/kit';

@Component({
	selector: 'wiki-test-modules',
	templateUrl: './test-modules.component.html',
	styleUrls: ['./test-modules.component.scss'],
})
export class TestModulesComponent extends BasePageComponent {
	view: string;
	backUrl: string[];

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		private previousRoute: PreviousRouteService,
	) {
		super(applicationLogger, router, activatedRoute);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'TestModulesComponent';
	}

	manageDataParams(data: Data) {}
	manageRouteParams(data: ParamMap) {}
	manageQueryParams(data: ParamMap) {
		if (data && data.get('view')) {
			this.view = data.get('view');
			this.backUrl = ['wiki', 'test-modules'];
		} else {
			this.view = undefined;
			this.backUrl = ['wiki'];
		}
	}

	go(view: string) {
		const to = new RouteUrlModel(['commons', 'reload']);
		const from = new RouteUrlModel(['wiki', 'test-modules'], view ? '?view=' + view : '');
		this.previousRoute.navigateStore(to, from);
	}

	back() {
		const to = new RouteUrlModel(['commons', 'reload']);
		const from = new RouteUrlModel(['wiki', 'test-modules']);
		this.previousRoute.navigateStore(to, from);
	}
}
