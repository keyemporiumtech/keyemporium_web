import { Injectable } from '@angular/core';
import { LanguageModel } from '../models/language.model';
import {
	ApplicationLoggerService,
	LocaleService,
	OptionListModel,
	BehaviourObserverModel,
	ApplicationStorageService,
} from '@ddc/kit';
import { Observable } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { map } from 'rxjs/operators';
import { BaseLanguageService } from '@ddc/rest';
import { DbFilterInterface } from '../../api/cakeutils/interfaces/db-filter.interface';
import { ApiFast } from '../../api/cakeutils/utility/api-fast.utility';

@Injectable({
	providedIn: 'root',
})
export class LanguageSystemService extends BaseLanguageService<LanguageModel> {
	constructor(
		applicationLogger: ApplicationLoggerService,
		localeService: LocaleService,
		private applicationStorage: ApplicationStorageService,
		private languageService: LanguageService,
	) {
		super(applicationLogger, localeService);
	}

	fnLanguages(init?: string[]): Observable<LanguageModel[]> {
		const filters: DbFilterInterface[] = [];
		if (init && init.length) {
			filters.push(ApiFast.queryField('cod', init));
		}
		return this.languageService
			.paginate({ filters: filters, orders: [{ key: 'cod', value: 'asc' }], paginate: undefined })
			.pipe(
				map((paginatorModel) => {
					if (!paginatorModel) {
						return [];
					}
					return paginatorModel ? paginatorModel.list : [];
				}),
			);
	}
	convertLanguages(languages: LanguageModel[]): OptionListModel[] {
		const options: OptionListModel[] = [];
		languages.forEach((language) => {
			options.push(new OptionListModel(language.cod, language.title, language));
		});
		return options;
	}
	convertLanguagesHTML(languages: LanguageModel[]): OptionListModel[] {
		const options: OptionListModel[] = [];
		languages.forEach((language) => {
			options.push(new OptionListModel(language.cod, language.titleHtml(), language));
		});
		return options;
	}
	behaviourLanguages(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: LanguageModel[]) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}

	fnChangeLanguage(cod: string): Observable<LanguageModel> {
		return this.languageService.setup(cod);
	}

	behaviourChangeLanguage(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: LanguageModel) => {
			this.applicationStorage.languageName.set(res.title);
			this.applicationStorage.languagePayload.setObj(res);
		};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}

	getClassName(): string {
		return 'LanguageSystemService';
	}

	// HTML
	languagesHTML(filters?: string[]): Observable<OptionListModel[]> {
		this.behaviourLanguages().actionPre();
		return this.fnLanguages(
			filters ? filters : this.applicationLogger.environment.default.languages,
		).pipe(
			map(
				(res) => {
					this.behaviourLanguages().actionResponse(res);
					return res ? this.convertLanguagesHTML(res) : [];
				},
				(err) => {
					this.behaviourLanguages().actionError(err);
					return [];
				},
			),
		);
	}
}
