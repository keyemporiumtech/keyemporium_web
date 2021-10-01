import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUrlModel } from '../models/route-url.model';
import { BaseService } from '../../abstract/base.service';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import { ApplicationStorageService } from '../../storage/services/application-storage.service';
import { PageUtility } from '../utility/page.utility';

@Injectable({
	providedIn: 'root',
})
export class PreviousRouteService extends BaseService {
	private currentUrl: string;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private router: Router,
		private applicationStorage: ApplicationStorageService,
	) {
		super(applicationLogger);
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
		this.applicationStorage.backUrl.del();
		this.router.navigateByUrl(urlBack);
	}
}
