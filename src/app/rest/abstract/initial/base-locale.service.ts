import {
	ApplicationLoggerService,
	OptionListModel,
	BehaviourObserverModel,
	BaseModel,
	LocaleService,
	BaseService,
} from '@ddc/kit';
import { Observable, Subscription } from 'rxjs';
import { OnInit, OnDestroy, Directive } from '@angular/core';

/**
 * Classe per la gestione utente delle lingue, valute e nazioni di sistema.
 *
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseLocaleService<
		L extends BaseModel,
		C extends BaseModel,
		N extends BaseModel,
	>
	extends BaseService
	implements OnInit, OnDestroy
{
	environment: any;
	localeService: LocaleService;
	languages: L[];
	languagesOptions: OptionListModel[];
	currencies: C[];
	currenciesOptions: OptionListModel[];
	nations: N[];
	nationsOptions: OptionListModel[];
	language: L;
	currency: C;
	nation: N;
	// sub
	subLanguages: Subscription;
	subChangeLanguage: Subscription;
	subCurrencies: Subscription;
	subChangeCurrency: Subscription;
	subNations: Subscription;
	subChangeNation: Subscription;

	constructor(applicationLogger: ApplicationLoggerService, localeService: LocaleService) {
		// super(applicationLogger, messageService, applicationStorage, innerStorage, http);
		super(applicationLogger);
		this.environment = this.applicationLogger.environment;
		this.localeService = localeService;
		this.languages = [];
		this.currencies = [];
		this.nations = [];
	}

	ngOnInit() {
		if (this.environment.enable.languages) {
			this.setupLanguages();
			this.setupLanguage(this.localeService.codLanguage);
		}
		if (this.environment.enable.currencies) {
			this.setupCurrencies();
			this.setupCurrency(this.localeService.codCurrency);
		}
		if (this.environment.enable.nations) {
			this.setupNations();
			this.setupNation(this.localeService.codNation);
		}
	}

	ngOnDestroy() {
		if (this.subLanguages) {
			this.subLanguages.unsubscribe();
		}
		if (this.subChangeLanguage) {
			this.subChangeLanguage.unsubscribe();
		}
		if (this.subCurrencies) {
			this.subCurrencies.unsubscribe();
		}
		if (this.subChangeCurrency) {
			this.subChangeCurrency.unsubscribe();
		}
		if (this.subNations) {
			this.subNations.unsubscribe();
		}
		if (this.subChangeNation) {
			this.subChangeNation.unsubscribe();
		}
	}

	/**
	 * Carica le lingue di sistema per una eventuale tipologica da gestire.
	 *
	 * Popola : languages e languagesOptions
	 */
	setupLanguages() {
		this.behaviourLanguages().actionPre();
		this.subLanguages = this.fnLanguages(this.environment.default.languages).subscribe(
			(res) => {
				this.behaviourLanguages().actionResponse(res);
				if (res) {
					this.languages = res;
					this.languagesOptions = this.convertLanguages(res);
				}
			},
			(err) => {
				this.behaviourLanguages().actionError(err);
			},
		);
	}
	/**
	 * Cambia la lingua di sistema e setta la response in language
	 * @param cod codice della lingua
	 */
	setupLanguage(cod: string) {
		this.behaviourChangeLanguage().actionPre();
		this.subChangeLanguage = this.fnChangeLanguage(cod).subscribe(
			(res) => {
				this.behaviourChangeLanguage().actionResponse(res);
				if (res) {
					this.language = res;
					this.localeService.changeLocalLanguage(cod);
				}
			},
			(err) => {
				this.behaviourChangeLanguage().actionError(err);
			},
		);
	}

	/**
	 * Carica le valute di sistema per una eventuale tipologica da gestire.
	 *
	 * Popola : currencies e currenciesOptions
	 */
	setupCurrencies() {
		this.behaviourCurrencies().actionPre();
		this.subCurrencies = this.fnCurrencies(this.environment.default.currencies).subscribe(
			(res) => {
				this.behaviourCurrencies().actionResponse(res);
				if (res) {
					this.currencies = res;
					this.currenciesOptions = this.convertCurrencies(res);
				}
			},
			(err) => {
				this.behaviourCurrencies().actionError(err);
			},
		);
	}
	/**
	 * Cambia la valuta di sistema e setta la response in currency
	 * @param cod codice della valuta
	 */
	setupCurrency(cod: string) {
		this.behaviourChangeCurrency().actionPre();
		this.subChangeCurrency = this.fnChangeCurrency(cod).subscribe(
			(res) => {
				this.behaviourChangeCurrency().actionResponse(res);
				if (res) {
					this.currency = res;
					this.localeService.changeLocalCurrency(cod);
				}
			},
			(err) => {
				this.behaviourChangeCurrency().actionError(err);
			},
		);
	}

	/**
	 * Carica le nazioni di sistema per una eventuale tipologica da gestire.
	 *
	 * Popola : nations e nationsOptions
	 */
	setupNations() {
		this.behaviourNations().actionPre();
		this.subNations = this.fnNations(this.environment.default.nations).subscribe(
			(res) => {
				this.behaviourNations().actionResponse(res);
				if (res) {
					this.nations = res;
					this.nationsOptions = this.convertNations(res);
				}
			},
			(err) => {
				this.behaviourNations().actionError(err);
			},
		);
	}
	/**
	 * Cambia la nazione di sistema e setta la response in nation
	 * @param cod codice della nazione
	 */
	setupNation(cod: string) {
		this.behaviourChangeNation().actionPre();
		this.subChangeNation = this.fnChangeNation(cod).subscribe(
			(res) => {
				this.behaviourChangeNation().actionResponse(res);
				if (res) {
					this.nation = res;
					this.localeService.changeLocalNation(cod);
				}
			},
			(err) => {
				this.behaviourChangeNation().actionError(err);
			},
		);
	}

	abstract fnLanguages(init?: string[]): Observable<L[]>;
	abstract behaviourLanguages(): BehaviourObserverModel;
	abstract fnChangeLanguage(cod: string): Observable<L>;
	abstract behaviourChangeLanguage(): BehaviourObserverModel;
	abstract convertLanguages(languages: L[]): OptionListModel[];

	abstract fnCurrencies(init?: string[]): Observable<C[]>;
	abstract behaviourCurrencies(): BehaviourObserverModel;
	abstract fnChangeCurrency(cod: string): Observable<C>;
	abstract behaviourChangeCurrency(): BehaviourObserverModel;
	abstract convertCurrencies(currencies: C[]): OptionListModel[];

	abstract fnNations(init?: string[]): Observable<N[]>;
	abstract behaviourNations(): BehaviourObserverModel;
	abstract fnChangeNation(cod: string): Observable<N>;
	abstract behaviourChangeNation(): BehaviourObserverModel;
	abstract convertNations(nations: N[]): OptionListModel[];
}
