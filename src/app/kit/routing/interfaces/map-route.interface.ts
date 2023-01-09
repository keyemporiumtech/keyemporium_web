import { NavigationExtras } from '@angular/router';

export interface MapRouteInterface {
	routeFrom: Array<string>;
	routeTo: Array<string>;
	extrasFrom?: NavigationExtras;
	extrasTo?: NavigationExtras;
	key?: string;
}
