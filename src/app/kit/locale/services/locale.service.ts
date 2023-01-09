import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from '../../abstract/base.service';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import { ApplicationStorageService } from '../../storage/services/application-storage.service';

@Injectable({
	providedIn: 'root',
})
export class LocaleService extends BaseService {
	private _environment: any;
	private _codLanguage: string;
	private _codCurrency: string;
	private _codNation: string;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private _applicationStorage: ApplicationStorageService,
		private _translate: TranslateService,
	) {
		super(applicationLogger);
		// console.error('LocaleService:' + Math.random());
		this.environment = this.applicationLogger.environment;
		this.init();
	}
	/**
	 * Inizializza i valori di default della lingua, valuta e nazione di sistema
	 */
	init() {
		// language
		this.codLanguage = this._applicationStorage.language.get() || this.environment.default.language;
		this.changeLocalLanguage(this.codLanguage);
		// currency
		this.codCurrency = this._applicationStorage.currency.get() || this.environment.default.currency;
		this.changeLocalCurrency(this.codCurrency);
		// nation
		this.codNation = this._applicationStorage.nation.get() || this.environment.default.nation;
		this.changeLocalNation(this.codNation);
	}

	getClassName(): string {
		return 'LocaleService';
	}

	changeLocalLanguage(cod: string) {
		// if (cod !== this._applicationStorage.language.get()) {
		this._translate.setDefaultLang(cod);
		this._translate.use(cod);
		this._applicationStorage.language.set(cod);
		this.applicationLogger.logSystemLanguageSet(this.log, cod);
		// }
	}

	changeLocalCurrency(cod: string) {
		// if (cod !== this._applicationStorage.currency.get()) {
		this._applicationStorage.currency.set(cod);
		this.applicationLogger.logSystemCurrencySet(this.log, cod);
		// }
	}
	changeLocalNation(cod: string) {
		// if (cod !== this._applicationStorage.nation.get()) {
		this._applicationStorage.nation.set(cod);
		this.applicationLogger.logSystemNationSet(this.log, cod);
		// }
	}

	/**
	 * Getter environment
	 * @return any
	 */
	public get environment(): any {
		return this._environment;
	}

	/**
	 * Setter environment
	 * @param any value
	 */
	public set environment(value: any) {
		this._environment = value;
	}

	/**
	 * Getter codLanguage
	 * @return string
	 */
	public get codLanguage(): string {
		return this._codLanguage;
	}

	/**
	 * Getter codCurrency
	 * @return string
	 */
	public get codCurrency(): string {
		return this._codCurrency;
	}

	/**
	 * Getter codNation
	 * @return string
	 */
	public get codNation(): string {
		return this._codNation;
	}

	/**
	 * Setter codLanguage
	 * @param string value
	 */
	public set codLanguage(value: string) {
		this._codLanguage = value;
	}

	/**
	 * Setter codCurrency
	 * @param string value
	 */
	public set codCurrency(value: string) {
		this._codCurrency = value;
	}

	/**
	 * Setter codNation
	 * @param string value
	 */
	public set codNation(value: string) {
		this._codNation = value;
	}
}
