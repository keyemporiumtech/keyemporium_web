import { Injectable } from '@angular/core';
import { NationModel } from '../models/nation.model';
import {
	ApplicationLoggerService,
	LocaleService,
	OptionListModel,
	BehaviourObserverModel,
	ApplicationStorageService,
} from '@ddc/kit';
import { Observable } from 'rxjs';
import { NationService } from '../services/nation.service';
import { map } from 'rxjs/operators';
import { BaseNationService } from '@ddc/rest';
import { DbFilterInterface } from '../../api/cakeutils/interfaces/db-filter.interface';
import { ApiFast } from '../../api/cakeutils/utility/api-fast.utility';

@Injectable({
	providedIn: 'root',
})
export class NationSystemService extends BaseNationService<NationModel> {
	showImages: boolean;

	constructor(
		applicationLogger: ApplicationLoggerService,
		localeService: LocaleService,
		private applicationStorage: ApplicationStorageService,
		private nationService: NationService,
	) {
		super(applicationLogger, localeService);
	}

	fnNations(init?: string[]): Observable<NationModel[]> {
		const filters: DbFilterInterface[] = [];
		if (init && init.length) {
			filters.push(ApiFast.queryField('cod', init));
		}
		return this.nationService
			.paginate({
				filters: filters,
				orders: [
					{ key: 'priority', value: 'desc' },
					{ key: 'name', value: 'asc' },
				],
				paginate: undefined,
			})
			.pipe(
				map((paginatorModel) => {
					if (!paginatorModel) {
						return [];
					}
					return paginatorModel ? paginatorModel.list : [];
				}),
			);
	}
	convertNations(nations: NationModel[]): OptionListModel[] {
		const options: OptionListModel[] = [];
		nations.forEach((nation) => {
			options.push(new OptionListModel(nation.cod_iso3166, nation.name, nation));
		});
		return options;
	}
	convertNationsHTML(nations: NationModel[]): OptionListModel[] {
		const options: OptionListModel[] = [];
		nations.forEach((nation) => {
			options.push(new OptionListModel(nation.cod_iso3166, nation.titleHtml(), nation));
		});
		return options;
	}
	behaviourNations(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: NationModel[]) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}

	fnChangeNation(codIso: string): Observable<NationModel> {
		return this.nationService.unique(undefined, undefined, codIso);
	}

	behaviourChangeNation(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: NationModel) => {
			this.applicationStorage.nation.set(res.cod_iso3166);
			this.applicationStorage.nationName.set(res.name);
			this.applicationStorage.nationPayload.setObj(res);
		};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}

	getClassName(): string {
		return 'NationSystemService';
	}

	// HTML
	nationsHTML(filters?: string[]): Observable<OptionListModel[]> {
		this.behaviourNations().actionPre();
		return this.fnNations(
			filters ? filters : this.applicationLogger.environment.default.nations,
		).pipe(
			map(
				(res) => {
					this.behaviourNations().actionResponse(res);
					return res ? this.convertNationsHTML(res) : [];
				},
				(err) => {
					this.behaviourNations().actionError(err);
					return [];
				},
			),
		);
	}
}
