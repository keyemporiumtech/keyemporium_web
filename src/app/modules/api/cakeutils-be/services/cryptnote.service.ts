import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	InnerStorageService,
	MessageService,
} from '@ddc/kit';
import {
	EnumParamType,
	PaginatorConverter,
	PaginatorModel,
	RequestManagerInterface,
	RequestUtility,
	ResponseManagerInterface,
} from '@ddc/rest';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AttachmentUtilConverter } from '../../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../../resources/models/attachment.model';
import { ApiService } from '../../cakeutils/base/api.service';
import { RequestConditionInterface } from '../../cakeutils/interfaces/request-conditions.interface';
import { RequestGroupsConditionsInterface } from '../../cakeutils/interfaces/request-groups-conditions.interface';
import { RequestPaginatorInterface } from '../../cakeutils/interfaces/request-paginator.interface';
import { RequestCakeUtility } from '../../cakeutils/utility/request-cake.utility';
import { cakeutilsBeList } from '../constants/cakeutils-be.list';
import { CryptnoteConverter, CryptnoteUtilConverter } from '../converters/cryptnote.converter';
import { CryptnoteModel } from '../models/cryptnote.model';

@Injectable()
export class CryptnoteService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
	}

	unique(
		id?: string,
		cod?: string,
		title?: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroups?: RequestGroupsConditionsInterface,
	): Observable<CryptnoteModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_cryptnote', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'title', title);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroups);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.cryptnote.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new CryptnoteConverter(),
			requestManager,
			responseManager,
		);
	}

	paginate(
		paginator: RequestPaginatorInterface,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroups?: RequestGroupsConditionsInterface,
	): Observable<PaginatorModel> {
		let body: HttpParams = new HttpParams();

		body = RequestCakeUtility.addPaginator(body, paginator);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroups);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.cryptnote.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new CryptnoteConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		cryptnoteIn: CryptnoteModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroups?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'cryptnote',
			CryptnoteUtilConverter.toDto(cryptnoteIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroups);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.cryptnote.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		cryptnoteIn: CryptnoteModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroups?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'cryptnote',
			CryptnoteUtilConverter.toDto(cryptnoteIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_cryptnote', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroups);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.cryptnote.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_cryptnote', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.cryptnote.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	saveAttachment(
		id_group: string,
		attachmentIn: AttachmentModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_group', id_group);
		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'attachment',
			AttachmentUtilConverter.toDto(attachmentIn),
		);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.cryptnote.saveattachment;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	deleteAttachment(
		id_group: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_group', id_group);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.cryptnote.deleteattachment;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
