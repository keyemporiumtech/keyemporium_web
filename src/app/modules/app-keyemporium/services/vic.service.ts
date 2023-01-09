import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestGroupsConditionsInterface } from '../../api/cakeutils/interfaces/request-groups-conditions.interface';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	InnerStorageService,
	MessageService,
} from '@ddc/kit';
import { Observable } from 'rxjs';
import {
	EnumParamType,
	RequestManagerInterface,
	RequestUtility,
	ResponseManagerInterface,
} from '@ddc/rest';
import { Injectable } from '@angular/core';
import { VicModel } from '../models/vic.model';
import { VicConverter } from '../converters/vic.converter';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { AppKeyemporiumList } from '../constants/app-keyemporium.list';
import { AttachmentConverter } from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { ContactreferenceConverter } from '../../authentication/converters/contactreference.converter';
import { map } from 'rxjs/operators';
import { AddressModel } from '../../localesystem/models/address.model';
import { AddressConverter } from '../../localesystem/converters/address.converter';

@Injectable()
export class VicService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
		this.flgInnerToken = false;
	}

	unique(
		id?: string,
		username?: string,
		flgimages?: boolean,
		flgattachments?: boolean,
		flgaddresses?: boolean,
		flgphones?: boolean,
		flgemails?: boolean,
		flglinks?: boolean,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<VicModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgimages', flgimages);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgattachments', flgattachments);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgaddresses', flgaddresses);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgphones', flgphones);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgemails', flgemails);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flglinks', flglinks);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + AppKeyemporiumList.vic.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new VicConverter(),
			requestManager,
			responseManager,
		);
	}

	images(
		id?: string,
		username?: string,
		flgprincipal?: boolean,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<AttachmentModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgprincipal', flgprincipal);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + AppKeyemporiumList.vic.images;
		return this.getList(
			this.httpHeaders,
			url,
			body,
			new AttachmentConverter(),
			requestManager,
			responseManager,
		);
	}

	attachments(
		id?: string,
		username?: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<AttachmentModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);

		body = RequestCakeUtility.addConditions(body, conditions);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + AppKeyemporiumList.vic.attachments;
		return this.getList(
			this.httpHeaders,
			url,
			body,
			new AttachmentConverter(),
			requestManager,
			responseManager,
		);
	}

	addresses(
		id?: string,
		username?: string,
		flgprincipal?: boolean,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<AddressModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgprincipal', flgprincipal);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + AppKeyemporiumList.vic.addresses;
		return this.getList(
			this.httpHeaders,
			url,
			body,
			new AddressConverter(),
			requestManager,
			responseManager,
		);
	}

	phones(
		id?: string,
		username?: string,
		flgprincipal?: boolean,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<AttachmentModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgprincipal', flgprincipal);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + AppKeyemporiumList.vic.phones;
		return this.getList(
			this.httpHeaders,
			url,
			body,
			new ContactreferenceConverter(),
			requestManager,
			responseManager,
		);
	}

	emails(
		id?: string,
		username?: string,
		flgprincipal?: boolean,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<AttachmentModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgprincipal', flgprincipal);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + AppKeyemporiumList.vic.emails;
		return this.getList(
			this.httpHeaders,
			url,
			body,
			new ContactreferenceConverter(),
			requestManager,
			responseManager,
		);
	}

	links(
		id?: string,
		username?: string,
		flgprincipal?: boolean,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<AttachmentModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgprincipal', flgprincipal);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + AppKeyemporiumList.vic.links;
		return this.getList(
			this.httpHeaders,
			url,
			body,
			new ContactreferenceConverter(),
			requestManager,
			responseManager,
		);
	}

	// --- delete
	deleteAttachment(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_attachment', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + AppKeyemporiumList.vic.deleteAttachment;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	deleteAddress(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_address', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + AppKeyemporiumList.vic.deleteAttachment;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	deleteContactreference(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_contactreference', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + AppKeyemporiumList.vic.deleteContactreference;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
