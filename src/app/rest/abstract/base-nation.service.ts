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

export abstract class BaseNationService<N extends BaseModel> extends BaseService {
	localeService: LocaleService;
	constructor(applicationLogger: ApplicationLoggerService, localeService: LocaleService) {
		super(applicationLogger);
		this.localeService = localeService;
	}

	nations(filters?: string[]): Observable<OptionListModel[]> {
		this.behaviourNations().actionPre();
		return this.fnNations(
			filters ? filters : this.applicationLogger.environment.default.nations,
		).pipe(
			map(
				(res) => {
					this.behaviourNations().actionResponse(res);
					return res ? this.convertNations(res) : [];
				},
				(err) => {
					this.behaviourNations().actionError(err);
					return [];
				},
			),
		);
	}

	setupNation(cod: string): Observable<N> {
		this.behaviourChangeNation().actionPre();
		return this.fnChangeNation(cod).pipe(
			map(
				(res) => {
					this.behaviourChangeNation().actionResponse(res);
					this.localeService.changeLocalNation(cod);
					return res;
				},
				(err) => {
					this.behaviourChangeNation().actionError(err);
				},
			),
		);
	}

	/**
	 * Ritorna la lista di lingue
	 * @param init lista di codici consentiti e da filtrare sulla response
	 */
	abstract fnNations(init?: string[]): Observable<N[]>;
	abstract behaviourNations(): BehaviourObserverModel;
	abstract fnChangeNation(cod: string): Observable<N>;
	abstract behaviourChangeNation(): BehaviourObserverModel;
	abstract convertNations(nations: N[]): OptionListModel[];
}
