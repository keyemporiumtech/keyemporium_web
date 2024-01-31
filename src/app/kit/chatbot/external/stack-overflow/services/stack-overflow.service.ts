import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApplicationLoggerService } from '../../../../logger/services/application-logger.service';
import { ChatbotBaseService } from '../../../abstract/chatbot-base.service';
import { ChatbotMessageInterface } from '../../../interfaces/chatbot-message.interface';
import { HttpClient } from '@angular/common/http';
import { StackOverflowSearchModel } from '../../../external/stack-overflow/models/stack-overflow-search.model';
import { StackOverflowConverter } from '../../../external/stack-overflow/converters/stack-overflow.converter';
import { StackOverflowFilter } from '../interfaces/stack-overflow.filter';
import { StackOverflowError } from '../interfaces/stack-overflow.error';
import { ObjectUtility } from '../../../../config/utility/object.utility';

@Injectable()
export class StackOverflowService extends ChatbotBaseService {
	converter = new StackOverflowConverter();
	constructor(applicationLogger: ApplicationLoggerService, private http: HttpClient) {
		super(applicationLogger);
	}

	getClassName(): string {
		return 'StackOverflowService';
	}
	ask(text: string, filters?: StackOverflowFilter): Observable<ChatbotMessageInterface[]> {
		filters = this.filterSearch(filters);
		if (!filters.q) {
			filters.q = text;
		}
		return this.search(this.converter.buildFilters(filters)).pipe(
			map((res) => {
				// console.error(res);
				return this.converter.convertStackOverflowSearchModelList(res);
			}),
		);
	}

	search(filters?: string): Observable<StackOverflowSearchModel[]> {
		const url = 'https://api.stackexchange.com/2.3/search/advanced?' + filters;

		return this.http.get<any>(url).pipe(
			map((res) => (res && res.items ? res.items.map((el) => this.createModel(el)) : [])),
			catchError((err: any) => {
				const model = new StackOverflowSearchModel();
				model.error = err.error as StackOverflowError;
				return of([model]);
			}),
		);
	}

	private filterSearch(filters?: StackOverflowFilter): StackOverflowFilter {
		if (!filters) {
			filters = {};
		}
		if (!filters.order) {
			filters.order = 'desc';
		}
		if (!filters.sort) {
			filters.sort = 'relevance';
		}
		if (!filters.site) {
			filters.site = 'stackoverflow';
		}
		return filters;
	}

	private createModel(obj: any) {
		const model: StackOverflowSearchModel = new StackOverflowSearchModel();
		for (const prop in obj) {
			model[prop] = obj[prop];
		}
		return model;
	}
}
