import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplicationLoggerService, BasePageComponent } from '@ddc/kit';

export class BaseModuleWikiPage extends BasePageComponent {
	subQueryParamsMap: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
	) {
		super(applicationLogger, router, activatedRoute);
	}
	view: any;

	set(view: string) {
		this.view = view;
	}

	home() {
		this.router.navigate(['wiki']);
	}

	manageDataParams(data: Data) {}
	manageRouteParams(data: ParamMap) {}
	manageQueryParams(data: ParamMap) {
		if (data && data.get('view')) {
			this.set(data.get('view'));
		} else {
			this.set(undefined);
		}
	}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'BaseModuleWikiPage';
	}
}
