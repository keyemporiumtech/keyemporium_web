import { BaseComponent } from './base.component';
import { ApplicationLoggerService } from '../logger/services/application-logger.service';
import { Subscription } from 'rxjs';
import { OnDestroy, Component, Directive } from '@angular/core';
import { Data, ParamMap, Router, ActivatedRoute } from '@angular/router';
import { RouteNavigationUtility } from '../routing/utility/route-navigation.utility';

/**
 * Da estendere nella creazione di componenti di pagina navigabili
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BasePageComponent extends BaseComponent implements OnDestroy {
	router: Router;
	activatedRoute: ActivatedRoute;
	routeManager: RouteNavigationUtility;
	tpRoute: 'static' | 'dynamic';
	// flags
	readyData: boolean;
	readyParamsMap: boolean;
	readyQueryParamsMap: boolean;
	private _readyParams: boolean;
	// subscriptions
	subData: Subscription;
	subParamsMap: Subscription;
	subQueryParamsMap: Subscription;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		tpRoute?: 'static' | 'dynamic',
	) {
		super(applicationLogger);
		this.router = router;
		this.activatedRoute = activatedRoute;
		this.routeManager = new RouteNavigationUtility(this.router, this.activatedRoute);
		this.tpRoute = tpRoute ? tpRoute : 'static';
		if (this.tpRoute === 'dynamic') {
			this.onParameters();
		} else {
			this.onSnapshot();
		}
	}

	set readyParams(val: boolean) {
		this.readyData = val;
		this.readyParamsMap = val;
		this.readyQueryParamsMap = val;
		this._readyParams = val;
	}
	get readyParams(): boolean {
		return this.readyData && this.readyParamsMap && this.readyQueryParamsMap;
	}

	private onParameters() {
		this.readyParams = false;

		this.subData = this.routeManager.waitData().subscribe(
			(res) => {
				this.manageDataParams(res);
				this.readyData = true;
			},
			(err) => {
				this.readyData = false;
			},
		);

		this.subParamsMap = this.routeManager.waitParamMap().subscribe(
			(res) => {
				this.manageRouteParams(res);
				this.readyParamsMap = true;
			},
			(err) => {
				this.readyParamsMap = false;
			},
		);

		this.subQueryParamsMap = this.routeManager.waitQueryParamMap().subscribe(
			(res) => {
				this.manageQueryParams(res);
				this.readyQueryParamsMap = true;
			},
			(err) => {
				this.readyQueryParamsMap = false;
			},
		);
	}
	private onSnapshot() {
		this.readyParams = false;
		this.manageDataParams(this.routeManager.snapshot.data);
		this.manageRouteParams(this.routeManager.snapshot.paramMap);
		this.manageQueryParams(this.routeManager.snapshot.queryParamMap);
		this.readyParams = true;
	}

	ngOnDestroy() {
		if (this.subData) {
			this.subData.unsubscribe();
		}
		if (this.subParamsMap) {
			this.subParamsMap.unsubscribe();
		}
		if (this.subQueryParamsMap) {
			this.subQueryParamsMap.unsubscribe();
		}
		super.ngOnDestroy();
	}

	/**
	 * Gestisce i dati passati dal routing con param  {path: '', data : {}}
	 * @param data dati recuperati dal routing
	 */
	abstract manageDataParams(data: Data);
	/**
	 * Gestisce i parametri intercettati dal routing {path: 'example/:id'}
	 * @param data parametri della url
	 */
	abstract manageRouteParams(data: ParamMap);
	/**
	 * Gestisce i parametri intercettati nella url ?id=XXX
	 * @param data query parameters della url
	 */
	abstract manageQueryParams(data: ParamMap);
}
