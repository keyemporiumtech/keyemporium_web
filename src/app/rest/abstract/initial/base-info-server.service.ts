import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BaseService,
	EnumTypeMime,
	FileEmbedModel,
	FileService,
	InnerStorageService,
	LocaleService,
} from '@ddc/kit';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, retryWhen, switchMap, tap } from 'rxjs/operators';

/**
 * Classe usata per impostare i valori di riferimento nello storage applicativo
 * fnSetupLanguage, getCodByLanguage, getNameByLanguage
 * - applicationStorage.language = CODICE_LINGUA (ITA)
 * - applicationStorage.languageName = NOME_LINGUA (Italiano)
 *
 * fnSetupCurrency, getCodByCurrency, getNameByCurrency, getSymbolByCurrency
 * - applicationStorage.currency = CODICE_VALUTA (EUR)
 * - applicationStorage.currencyName = NOME_VALUTA (Euro)
 * - applicationStorage.currencySymbol = SIMBOLO_VALUTA (€)
 *
 * fnSetupNation, getCodByNation, getNameByNation
 * - applicationStorage.nation = CODICE_NAZIONE (IT)
 * - applicationStorage.nationName = NOME_NAZIONE (Italy)
 *
 * fnTimezoneServer, fnTimezoneNameServer
 * - localStorage.timezoneServer = TIMEZONE_VALUE (+01:00)
 * - localStorage.timezoneServerName = TIMEZONE_NAME (Europe/Berlin)
 *
 * fnLoadCookiePolicy, fnLoadPrivacyPolicy, fnLoadTermPolicy
 * - applicationStorage.cookiePolicyResource = FILE_COOKIE
 * - applicationStorage.privacyPolicyResource = FILE_POLICY
 * - applicationStorage.termPolicyResource = FILE_TERM
 *
 * fnLoadActivity
 * - applicationStorage.activityPrincipal = OBJ_ACTIVITY
 */
export abstract class BaseInfoServerService extends BaseService {
	loading: boolean;
	applicationStorage: ApplicationStorageService;
	innerStorage: InnerStorageService;
	localeService: LocaleService;
	fileService: FileService;

	// maps observable
	mapBase: Map<string, Observable<any>>; // language, currency, nation
	mapInitials: Map<string, Observable<any>>; // timezone, timezone_name, cookie, privacy, term, activity
	mapOthers: Map<string, Observable<any>>;

	constructor(
		applicationLogger: ApplicationLoggerService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		localeService: LocaleService,
		fileService: FileService,
	) {
		super(applicationLogger);
		this.applicationStorage = applicationStorage;
		this.innerStorage = innerStorage;
		this.localeService = localeService;
		this.fileService = fileService;
		// maps
		this.mapBase = new Map();
		this.mapInitials = new Map();
		this.mapOthers = new Map();
	}

	initValues(): Observable<any> {
		// return of(true);
		this.loading = true;
		localStorage.removeItem('timezoneServer');
		localStorage.removeItem('timezoneNameServer');
		return this.first().pipe(
			switchMap((data1: any) => {
				if (data1[0]) {
					this.localeService.changeLocalLanguage(data1[0].cod);
					this.applicationStorage.languageName.set(data1[0].name);
					this.applicationStorage.languagePayload.set(data1[0].payload);
				}
				if (data1[1]) {
					this.localeService.changeLocalCurrency(data1[1].cod);
					this.applicationStorage.currencyName.set(data1[1].name);
					this.applicationStorage.currencySymbol.set(data1[1].symbol);
					this.applicationStorage.currencyPayload.set(data1[1].payload);
				}
				if (data1[2]) {
					this.localeService.changeLocalNation(data1[2].cod);
					this.applicationStorage.nationName.set(data1[2].name);
					this.applicationStorage.nationPayload.set(data1[2].payload);
				}
				return this.second().pipe(
					tap((data2) => {
						localStorage.setItem('timezoneServer', data2[0]);
						this.applicationLogger.logInfoServerTimezone(this.log, data2[0], 'timezoneServer');
						localStorage.setItem('timezoneNameServer', data2[1]);
						this.applicationLogger.logInfoServerTimezoneName(
							this.log,
							data2[1],
							'timezoneNameServer',
						);
						this.applicationStorage.cookiePolicyResource.setObj(data2[2]);
						this.applicationStorage.privacyPolicyResource.setObj(data2[3]);
						this.applicationStorage.termPolicyResource.setObj(data2[4]);

						if (data2[5]) {
							this.applicationStorage.activityPrincipal.setObj(data2[5]);
						}

						if (this.mapOthers.size > 0) {
							this.fnManageOtherMaps(data2.slice(6, data2.length));
						}
						this.loading = false;
					}),
					map((res) => {
						return true;
					}),
					catchError((err: any) => {
						console.error('Errore di inizializzazione', err);
						return undefined;
					}),
					retryWhen((errors) => {
						return of(undefined);
					}),
				);
			}),
		);
	}

	private first(): Observable<any> {
		return combineLatest([this.fnLanguage(), this.fnCurrency(), this.fnNation()]);
	}
	private second(): Observable<any> {
		const $obsList = [
			this.fnTimezoneServer(),
			this.fnTimezoneNameServer(),
			this.fnLoadCookiePolicy(),
			this.fnLoadPrivacyPolicy(),
			this.fnLoadTermPolicy(),
			this.fnLoadActivity(),
		];
		if (this.mapOthers.size > 0) {
			$obsList.push(...this.mapOthers.values());
		}

		return combineLatest($obsList);
	}

	// ---------- LANGUAGE environment.default.language -> applicationStorage.language
	setLanguage($obs: Observable<{ cod; name; payload }>) {
		this.mapInitials.set('language', $obs);
	}

	fnLanguage(): Observable<{ cod; name; payload }> {
		if (this.mapInitials.has('language')) {
			const $obs: Observable<{ cod; name; payload }> = this.mapInitials.get('language');
			return $obs.pipe(
				switchMap((res) => {
					return res ? of(res) : this.languageDefault();
				}),
			);
		} else {
			return this.languageDefault();
		}
	}

	private languageDefault(): Observable<{ cod; name; payload }> {
		if (!this.applicationLogger.environment.default.language) {
			return of(undefined);
		}
		return of({
			cod: this.applicationLogger.environment.default.language,
			name: this.applicationLogger.environment.default.languageName,
			payload: {
				cod: this.applicationLogger.environment.default.language,
				name: this.applicationLogger.environment.default.languageName,
			},
		});
	}

	// ---------- CURRENCY environment.default.currency -> applicationStorage.currency
	setCurrency($obs: Observable<{ cod; name; symbol; payload }>) {
		this.mapInitials.set('currency', $obs);
	}

	fnCurrency(): Observable<{ cod; name; symbol; payload }> {
		if (this.mapInitials.has('currency')) {
			const $obs: Observable<{ cod; name; symbol; payload }> = this.mapInitials.get('currency');
			return $obs.pipe(
				switchMap((res) => {
					return res ? of(res) : this.currencyDefault();
				}),
			);
		} else {
			return this.currencyDefault();
		}
	}

	private currencyDefault(): Observable<{ cod; name; symbol; payload }> {
		if (!this.applicationLogger.environment.default.currency) {
			return of(undefined);
		}
		return of({
			cod: this.applicationLogger.environment.default.currency,
			name: this.applicationLogger.environment.default.currencyName,
			symbol: this.applicationLogger.environment.default.currencySymbol,
			payload: {
				cod: this.applicationLogger.environment.default.currency,
				name: this.applicationLogger.environment.default.currencyName,
				symbol: this.applicationLogger.environment.default.currencySymbol,
			},
		});
	}

	// ---------- NATION environment.default.nation -> applicationStorage.nation
	setNation($obs: Observable<{ cod; name; payload }>) {
		this.mapInitials.set('nation', $obs);
	}

	fnNation(): Observable<{ cod; name; payload }> {
		if (this.mapInitials.has('nation')) {
			const $obs: Observable<{ cod; name; payload }> = this.mapInitials.get('nation');
			return $obs.pipe(
				switchMap((res) => {
					return res ? of(res) : this.nationDefault();
				}),
			);
		} else {
			return this.nationDefault();
		}
	}

	private nationDefault(): Observable<{ cod; name; payload }> {
		if (!this.applicationLogger.environment.default.nation) {
			return of(undefined);
		}
		return of({
			cod: this.applicationLogger.environment.default.nation,
			name: this.applicationLogger.environment.default.nationName,
			payload: {
				cod: this.applicationLogger.environment.default.nation,
				name: this.applicationLogger.environment.default.nationName,
			},
		});
	}

	// ---------- TIMEZONE_SERVER environment.default.timezoneVal -> localStorage['timezoneServer']
	setTimezone($obs: Observable<string>) {
		this.mapInitials.set('timezone', $obs);
	}
	/**
	 * Fornisce il valore del timezone del server
	 *
	 * @example
	 * +01:00
	 */
	fnTimezoneServer(): Observable<string> {
		if (this.mapInitials.has('timezone')) {
			const $obs: Observable<string> = this.mapInitials.get('timezone');
			return $obs.pipe(
				switchMap((res) => {
					return res ? of(res) : this.timezoneServerDefault();
				}),
			);
		} else {
			return this.timezoneServerDefault();
		}
	}

	private timezoneServerDefault(): Observable<string> {
		if (!this.applicationLogger.environment.default.timezoneVal) {
			return of(undefined);
		}
		return of(this.applicationLogger.environment.default.timezoneVal);
	}

	// ---------- TIMEZONE_SERVER_NAME environment.default.timezoneName -> localStorage['timezoneNameServer']
	setTimezoneName($obs: Observable<string>) {
		this.mapInitials.set('timezone_name', $obs);
	}
	/**
	 * Fornisce il nome del timezone del server
	 *
	 * @example
	 * Europe/Berlin
	 */
	fnTimezoneNameServer(): Observable<string> {
		if (this.mapInitials.has('timezone_name')) {
			const $obs: Observable<string> = this.mapInitials.get('timezone_name');
			return $obs.pipe(
				switchMap((res) => {
					return res ? of(res) : this.timezoneNameServerDefault();
				}),
			);
		} else {
			return this.timezoneNameServerDefault();
		}
	}

	private timezoneNameServerDefault(): Observable<string> {
		if (!this.applicationLogger.environment.default.timezoneName) {
			return of(undefined);
		}
		return of(this.applicationLogger.environment.default.timezoneName);
	}

	// ---------- COOKIE : environment.api.cookiePolicy || environment.url.cookiePolicy -> applicationStorage.cookiePolicyResource
	setCookie($obs: Observable<FileEmbedModel>) {
		this.mapInitials.set('cookie', $obs);
	}
	/**
	 * Fornisce il file o il link delle cookie policy
	 */
	fnLoadCookiePolicy(): Observable<FileEmbedModel> {
		if (this.mapInitials.has('cookie')) {
			const $obs: Observable<FileEmbedModel> = this.mapInitials.get('cookie');
			return $obs.pipe(
				switchMap((res) => {
					return res ? of(res) : this.loadCookiePolicyDefault();
				}),
			);
		} else if (this.applicationLogger.environment.api.cookiePolicy) {
			return this.callApiCookiePolicy(this.applicationLogger.environment.api.cookiePolicy);
		} else {
			return this.loadCookiePolicyDefault();
		}
	}
	private loadCookiePolicyDefault(): Observable<FileEmbedModel> {
		if (
			!this.applicationLogger.environment.api.cookiePolicy &&
			!this.applicationLogger.environment.url.cookiePolicy
		) {
			return of(undefined);
		} else if (this.applicationLogger.environment.url.cookiePolicy) {
			const file: FileEmbedModel = this.fileService.buildFileEmbed(
				'APP.COOKIE.TITLE',
				'application/pdf',
				EnumTypeMime.APPLICATION,
				'pdf',
				undefined,
				this.applicationLogger.environment.url.cookiePolicy,
			);
			return of(file);
		}
		return of(undefined);
	}

	// ---------- PRIVACY : environment.api.privacyPolicy || environment.url.privacyPolicy -> applicationStorage.privacyPolicyResource
	setPrivacy($obs: Observable<FileEmbedModel>) {
		this.mapInitials.set('privacy', $obs);
	}
	/**
	 * Fornisce il file o il link delle cookie policy
	 */
	fnLoadPrivacyPolicy(): Observable<FileEmbedModel> {
		if (this.mapInitials.has('privacy')) {
			const $obs: Observable<FileEmbedModel> = this.mapInitials.get('privacy');
			return $obs.pipe(
				switchMap((res) => {
					return res ? of(res) : this.loadPrivacyPolicyDefault();
				}),
			);
		} else if (this.applicationLogger.environment.api.privacyPolicy) {
			return this.callApiPrivacyPolicy(this.applicationLogger.environment.api.privacyPolicy);
		} else {
			return this.loadPrivacyPolicyDefault();
		}
	}
	private loadPrivacyPolicyDefault(): Observable<FileEmbedModel> {
		if (
			!this.applicationLogger.environment.api.privacyPolicy &&
			!this.applicationLogger.environment.url.privacyPolicy
		) {
			return of(undefined);
		} else if (this.applicationLogger.environment.url.privacyPolicy) {
			const file: FileEmbedModel = this.fileService.buildFileEmbed(
				'APP.PRIVACY.TITLE',
				'application/pdf',
				EnumTypeMime.APPLICATION,
				'pdf',
				undefined,
				this.applicationLogger.environment.url.privacyPolicy,
			);
			return of(file);
		}
		return of(undefined);
	}

	// ---------- TERM : environment.api.termPolicy || environment.url.termPolicy -> applicationStorage.termPolicyResource
	setTerm($obs: Observable<FileEmbedModel>) {
		this.mapInitials.set('term', $obs);
	}
	/**
	 * Fornisce il file o il link delle cookie policy
	 */
	fnLoadTermPolicy(): Observable<FileEmbedModel> {
		if (this.mapInitials.has('term')) {
			const $obs: Observable<FileEmbedModel> = this.mapInitials.get('term');
			return $obs.pipe(
				switchMap((res) => {
					return res ? of(res) : this.loadTermPolicyDefault();
				}),
			);
		} else if (this.applicationLogger.environment.api.termPolicy) {
			return this.callApiTermPolicy(this.applicationLogger.environment.api.termPolicy);
		} else {
			return this.loadTermPolicyDefault();
		}
	}
	private loadTermPolicyDefault(): Observable<FileEmbedModel> {
		if (
			!this.applicationLogger.environment.api.termPolicy &&
			!this.applicationLogger.environment.url.termPolicy
		) {
			return of(undefined);
		} else if (this.applicationLogger.environment.url.termPolicy) {
			const file: FileEmbedModel = this.fileService.buildFileEmbed(
				'APP.TERM.TITLE',
				'application/pdf',
				EnumTypeMime.APPLICATION,
				'pdf',
				undefined,
				this.applicationLogger.environment.url.termPolicy,
			);
			return of(file);
		}
		return of(undefined);
	}

	// ---------- ACTIVITY environment.default.activityPIVA -> applicationStorage.activityPrincipal.piva
	setActivity($obs: Observable<any>) {
		this.mapInitials.set('activity', $obs);
	}

	fnLoadActivity(): Observable<any> {
		if (this.mapInitials.has('activity')) {
			const $obs: Observable<any> = this.mapInitials.get('activity');
			return $obs.pipe(
				switchMap((res) => {
					return res ? of(res) : this.activityDefault();
				}),
			);
		} else {
			return this.activityDefault();
		}
	}

	private activityDefault(): Observable<any> {
		if (this.applicationLogger.environment.default.activityPIVA) {
			return of({ piva: this.applicationLogger.environment.default.activityPIVA });
		}
		return of(undefined);
	}

	/**
	 * Da implementare se è stato fornita l'api in environment.api.cookiePolicy
	 * @param api valore in environment.api.cookiePolicy
	 */
	abstract callApiCookiePolicy(api: string): Observable<FileEmbedModel>;

	/**
	 * Da implementare se è stato fornita l'api in environment.api.privacyPolicy
	 * @param api valore in environment.api.privacyPolicy
	 */
	abstract callApiPrivacyPolicy(api: string): Observable<FileEmbedModel>;

	/**
	 * Da implementare se è stato fornita l'api in environment.api.termPolicy
	 * @param api valore in environment.api.termPolicy
	 */
	abstract callApiTermPolicy(api: string): Observable<FileEmbedModel>;

	/**
	 * Gestisce i risultati di altri observable inseriti nella mappa mapOthers
	 */
	abstract fnManageOtherMaps(data): void;
}
