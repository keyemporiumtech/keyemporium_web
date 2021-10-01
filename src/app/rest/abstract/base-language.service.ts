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

export abstract class BaseLanguageService<L extends BaseModel> extends BaseService {
	localeService: LocaleService;
	constructor(applicationLogger: ApplicationLoggerService, localeService: LocaleService) {
		super(applicationLogger);
		this.localeService = localeService;
	}

	languages(filters?: string[]): Observable<OptionListModel[]> {
		this.behaviourLanguages().actionPre();
		return this.fnLanguages(
			filters ? filters : this.applicationLogger.environment.default.languages,
		).pipe(
			map(
				(res) => {
					this.behaviourLanguages().actionResponse(res);
					return res ? this.convertLanguages(res) : [];
				},
				(err) => {
					this.behaviourLanguages().actionError(err);
					return [];
				},
			),
		);
	}

	setupLanguage(cod: string): Observable<L> {
		this.behaviourChangeLanguage().actionPre();
		return this.fnChangeLanguage(cod).pipe(
			map(
				(res) => {
					this.behaviourChangeLanguage().actionResponse(res);
					this.localeService.changeLocalLanguage(cod);
					return res;
				},
				(err) => {
					this.behaviourChangeLanguage().actionError(err);
					return undefined;
				},
			),
		);
	}

	/**
	 * Ritorna la lista di lingue
	 * @param init lista di codici consentiti e da filtrare sulla response
	 */
	abstract fnLanguages(init?: string[]): Observable<L[]>;
	abstract behaviourLanguages(): BehaviourObserverModel;
	abstract fnChangeLanguage(cod: string): Observable<L>;
	abstract behaviourChangeLanguage(): BehaviourObserverModel;
	abstract convertLanguages(languages: L[]): OptionListModel[];
}
