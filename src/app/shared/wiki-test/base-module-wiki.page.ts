import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouteNavigationUtility } from '@ddc/kit';

export class BaseModuleWikiPage {
	subQueryParamsMap: Subscription;
	router: Router;
	activatedRoute: ActivatedRoute;

	constructor(router: Router, activatedRoute: ActivatedRoute) {
		this.router = router;
		this.activatedRoute = activatedRoute;
		const routeManager = new RouteNavigationUtility(router, activatedRoute);

		this.subQueryParamsMap = routeManager.waitQueryParamMap().subscribe((res) => {
			if (res && res.get('view')) {
				this.set(res.get('view'));
			}
		});
	}
	view: any;

	set(view: string) {
		this.view = view;
	}

	home() {
		this.router.navigate(['wiki']);
	}
}
