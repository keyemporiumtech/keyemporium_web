import {
	BaseService,
	ApplicationLoggerService,
	LocaleService,
	BaseModel,
	OptionListModel,
	BehaviourObserverModel,
} from '@ddc/kit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class BaseCurrencyService<C extends BaseModel> extends BaseService {
	localeService: LocaleService;
	constructor(applicationLogger: ApplicationLoggerService, localeService: LocaleService) {
		super(applicationLogger);
		this.localeService = localeService;
	}

	currencies(filters?: string[]): Observable<OptionListModel[]> {
		this.behaviourCurrencies().actionPre();
		return this.fnCurrencies(
			filters ? filters : this.applicationLogger.environment.default.currencies,
		).pipe(
			map(
				(res) => {
					this.behaviourCurrencies().actionResponse(res);
					return res ? this.convertCurrencies(res) : [];
				},
				(err) => {
					this.behaviourCurrencies().actionError(err);
					return [];
				},
			),
		);
	}

	setupCurrency(cod: string): Observable<C> {
		this.behaviourChangeCurrency().actionPre();
		return this.fnChangeCurrency(cod).pipe(
			map(
				(res) => {
					this.behaviourChangeCurrency().actionResponse(res);
					this.localeService.changeLocalCurrency(cod);
					return res;
				},
				(err) => {
					this.behaviourChangeCurrency().actionError(err);
				},
			),
		);
	}

	/**
	 * Ritorna la lista di valute
	 * @param init lista di codici consentiti e da filtrare sulla response
	 */
	abstract fnCurrencies(init?: string[]): Observable<C[]>;
	abstract behaviourCurrencies(): BehaviourObserverModel;
	abstract fnChangeCurrency(cod: string): Observable<C>;
	abstract behaviourChangeCurrency(): BehaviourObserverModel;
	abstract convertCurrencies(currencies: C[]): OptionListModel[];
}
