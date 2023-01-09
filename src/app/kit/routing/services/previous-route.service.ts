import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { RouteUrlModel } from '../models/route-url.model';
import { BaseService } from '../../abstract/base.service';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import { ApplicationStorageService } from '../../storage/services/application-storage.service';
import { PageUtility } from '../utility/page.utility';
import { MapRouteInterface } from '../interfaces/map-route.interface';

@Injectable({
	providedIn: 'root',
})
export class PreviousRouteService extends BaseService {
	private currentUrl: string;
	// stored: MapRouteInterface[] = [];

	constructor(
		applicationLogger: ApplicationLoggerService,
		private router: Router,
		private applicationStorage: ApplicationStorageService,
	) {
		super(applicationLogger);
		// this.stored.length = 0;
	}

	getClassName(): string {
		return 'PreviousRouteService';
	}

	navigateStore(to: RouteUrlModel, from?: RouteUrlModel) {
		this.currentUrl = from ? from.urlNavigate : this.router.url;
		this.applicationStorage.backUrl.set(this.currentUrl);
		this.router.navigateByUrl(to.urlNavigate);
	}

	/**
	 * Naviga codificando i parametri della url
	 * @param url url generica (@example 'chat/:id/user' oppure ['chat', ':id', 'user'])
	 * @param params parametri da sostituire ai parametri generici (@example ['paramId'])
	 * @param from url a cui tornare con il metodo [back]{@link PreviousRouteService#back}
	 */
	navigateStoreEncode(url: string | string[], params?: string[], from?: RouteUrlModel) {
		this.currentUrl = from ? from.urlNavigate : this.router.url;
		this.applicationStorage.backUrl.set(this.currentUrl);
		const urlEncode: string[] = PageUtility.encodeUrl(url, params);
		const to: RouteUrlModel = new RouteUrlModel(urlEncode);
		this.router.navigateByUrl(to.urlNavigate);
	}

	back() {
		const urlBack = this.applicationStorage.backUrl.get();
		if (urlBack) {
			this.applicationStorage.backUrl.del();
			this.router.navigateByUrl(urlBack);
		} else if (this.isAnyFromPending()) {
			const stored = this.getStored();
			const urlCurrent = PageUtility.splitUrlNavigationExtrasQueryParameters(
				this.router.url,
			).url.join('/');
			const indexTo = stored.findIndex((el) => urlCurrent.indexOf(el.key) !== -1);
			if (indexTo !== -1) {
				const back = stored[indexTo];
				stored.splice(indexTo, 1);
				this.applicationStorage.storedUrls.setObj(stored);
				this.router.navigate(back.routeFrom, back.extrasFrom);
			}
		}
	}

	navigate(
		routeTo: Array<string>,
		extrasTo?: NavigationExtras,
		routeFrom?: Array<string>,
		extrasFrom?: NavigationExtras,
	) {
		const stored = this.getStored();
		const indexTo = stored.findIndex((el) => el.key === routeTo.join('/'));
		const routeFromUN = PageUtility.splitUrlNavigationExtrasQueryParameters(
			routeFrom ? routeFrom.join('/') : this.router.url,
			extrasFrom,
		);
		const routeF = routeFromUN.url;
		const extrasF = routeFromUN.extras;
		// routeFrom.splice(0, 1);
		if (indexTo !== -1) {
			stored[indexTo].routeFrom = routeFromUN.url;
			stored[indexTo].extrasFrom = routeFromUN.extras;
			if (extrasTo) {
				stored[indexTo].extrasTo = extrasTo;
			}
		} else {
			stored.push({
				routeTo: routeTo,
				routeFrom: routeF,
				extrasTo: extrasTo,
				extrasFrom: extrasF,
				key: routeTo.join('/'),
			});
		}
		this.applicationStorage.storedUrls.setObj(stored);
		this.router.navigate(routeTo, extrasTo);
	}

	isAnyFromPending(): boolean {
		const stored = this.getStored();
		const urlCurrent = PageUtility.splitUrlNavigationExtrasQueryParameters(
			this.router.url,
		).url.join('/');
		return !!stored.find((el) => urlCurrent.indexOf(el.key) !== -1);
	}

	// utils
	private getStored() {
		const stored = this.applicationStorage.storedUrls.getObj();
		if (!stored) {
			this.applicationStorage.storedUrls.setObj([]);
		}
		return this.applicationStorage.storedUrls.getObj();
	}
	simulation(
		routeTo: Array<string>,
		extrasTo?: NavigationExtras,
		routeFrom?: Array<string>,
		extrasFrom?: NavigationExtras,
	): MapRouteInterface {
		const routeFromUN = PageUtility.splitUrlNavigationExtrasQueryParameters(
			routeFrom ? routeFrom.join('/') : this.router.url,
			extrasFrom,
		);
		const routeF = routeFromUN.url;
		const extrasF = routeFromUN.extras;

		return {
			routeTo: routeTo,
			routeFrom: routeF,
			extrasTo: extrasTo,
			extrasFrom: extrasF,
			key: routeTo.join('/'),
		};
	}
}
