import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApplicationLoggerService } from '../logger/services/application-logger.service';
import { RouteNavigationUtility } from '../routing/utility/route-navigation.utility';
import { BaseComponent } from './base.component';

/**
 * Da estendere nella creazione di componenti di pagina navigabili
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BasePageComponent extends BaseComponent implements OnInit, OnDestroy {
	router: Router;
	activatedRoute: ActivatedRoute;
	routeManager: RouteNavigationUtility;
	tpRoute: 'static' | 'dynamic';
	// flags
	readyData: boolean;
	readyParamsMap: boolean;
	readyQueryParamsMap: boolean;
	finishData: boolean;
	finishParamsMap: boolean;
	finishQueryParamsMap: boolean;
	private _readyParams: boolean;
	private _finishParams: boolean;
	// subscriptions
	// subData: Subscription;
	// subParamsMap: Subscription;
	// subQueryParamsMap: Subscription;
	subParams: Subscription;

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

	set finishParams(val: boolean) {
		this.finishData = val;
		this.finishParamsMap = val;
		this.finishQueryParamsMap = val;
		this._finishParams = val;
	}
	get finishParams(): boolean {
		return this.finishData && this.finishParamsMap && this.finishQueryParamsMap;
	}

	private onParameters(): Observable<any> {
		return combineLatest([
			this.routeManager.waitData(),
			this.routeManager.waitParamMap(),
			this.routeManager.waitQueryParamMap(),
		]).pipe(
			map((data) => {
				return this.manageData(data);
			}),
			catchError((err) => {
				this.log.error('Keep onParameters params error', err);
				return of({
					data: false,
					params: false,
					queryParams: false,
				});
			}),
		);
	}

	private onSnapshot(): Observable<{ data: boolean; params: boolean; queryParams: boolean }> {
		return combineLatest([
			of(this.routeManager.snapshot.data),
			of(this.routeManager.snapshot.paramMap),
			of(this.routeManager.snapshot.queryParamMap),
		]).pipe(
			map((data) => {
				return this.manageData(data);
			}),
			catchError((err) => {
				this.log.error('Keep onSnapshot params error', err);
				return of({
					data: false,
					params: false,
					queryParams: false,
				});
			}),
		);
	}

	private manageData(data: any[]): { data: boolean; params: boolean; queryParams: boolean } {
		if (data[0]) {
			this.manageDataParams(data[0]);
			this.readyData = true;
		}
		if (data[1]) {
			this.manageRouteParams(data[1]);
			this.readyParamsMap = true;
		}
		if (data[2]) {
			this.manageQueryParams(data[2]);
			this.readyQueryParamsMap = true;
		}
		this.finishData = true;
		this.finishParamsMap = true;
		this.finishQueryParamsMap = true;
		return {
			data: Object.keys(data[0]).length > 0,
			params: data[1].keys.length > 0,
			queryParams: data[2].keys.length > 0,
		};
	}

	ngOnInit() {
		let $obs: Observable<{ data: boolean; params: boolean; queryParams: boolean }>;
		if (this.tpRoute === 'dynamic') {
			$obs = this.onParameters();
		} else {
			$obs = this.onSnapshot();
		}

		this.subParams = $obs.subscribe((res) => {
			this.log.info('parameters by route', res);
			super.ngOnInit();
		});
	}

	ngOnDestroy() {
		if (this.subParams) {
			this.subParams.unsubscribe();
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
