import {
	ActivatedRoute,
	Router,
	Data,
	ParamMap,
	Params,
	NavigationExtras,
	ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export class RouteNavigationUtility {
	router: Router;
	activatedRoute: ActivatedRoute;
	constructor(router: Router, activatedRoute: ActivatedRoute) {
		this.router = router;
		this.activatedRoute = activatedRoute;
	}

	waitData(): Observable<Data> {
		return this.activatedRoute.data;
	}
	waitParamMap(): Observable<ParamMap> {
		return this.activatedRoute.paramMap;
	}
	waitQueryParamMap(): Observable<ParamMap> {
		return this.activatedRoute.queryParamMap;
	}
	waitQueryParams(): Observable<Params> {
		return this.activatedRoute.queryParams;
	}
	waitParams(): Observable<Params> {
		return this.activatedRoute.params;
	}
	waitFragment(): Observable<string> {
		return this.activatedRoute.fragment;
	}

	getState(): any {
		return this.router.getCurrentNavigation().extras.state;
	}

	navigate(commands: any[], extras?: NavigationExtras) {
		this.router.navigate(commands, extras);
	}

	get snapshot(): ActivatedRouteSnapshot {
		return this.activatedRoute.snapshot;
	}
}
