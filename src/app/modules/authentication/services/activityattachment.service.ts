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
	PaginatorConverter,
	PaginatorModel,
	RequestManagerInterface,
	RequestUtility,
	ResponseManagerInterface,
} from '@ddc/rest';
import { Injectable } from '@angular/core';
import { ActivityattachmentModel } from '../models/activityattachment.model';
import {
	ActivityattachmentConverter,
	ActivityattachmentUtilConverter,
} from '../converters/activityattachment.converter';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { authenticationList } from '../constants/authentication.list';
import { EnumAttachmentType } from '../../resources/enums/attachment-type.enum';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { AttachmentUtilConverter } from '../../resources/converters/attachment.converter';

@Injectable()
export class ActivityattachmentService extends ApiService {
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
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<ActivityattachmentModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activityattachment', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityattachment.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new ActivityattachmentConverter(),
			requestManager,
			responseManager,
		);
	}

	paginate(
		paginator: RequestPaginatorInterface,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<PaginatorModel> {
		let body: HttpParams = new HttpParams();

		body = RequestCakeUtility.addPaginator(body, paginator);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityattachment.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new ActivityattachmentConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		activityattachmentIn: ActivityattachmentModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'activityattachment',
			ActivityattachmentUtilConverter.toDto(activityattachmentIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityattachment.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		activityattachmentIn: ActivityattachmentModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'activityattachment',
			ActivityattachmentUtilConverter.toDto(activityattachmentIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activityattachment', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityattachment.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activityattachment', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityattachment.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	principal(
		id_activity?: string,
		activityname?: string,
		type?: EnumAttachmentType,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<ActivityattachmentModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id_activity);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'activityname', activityname);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'type', type.toString());
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityattachment.principal;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new ActivityattachmentConverter(),
			requestManager,
			responseManager,
		);
	}

	setPrincipal(
		id_activity?: string,
		activityname?: string,
		id?: string,
		cod?: string,
		type?: EnumAttachmentType,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id_activity);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'activityname', activityname);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activityattachment', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod_activityattachment', cod);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'type', type.toString());
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityattachment.setprincipal;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	saveRelation(
		id_activity: string,
		attachmentIn: AttachmentModel,
		tpattachment: EnumAttachmentType,
		flgprincipal?: boolean,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id_activity);
		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'attachment',
			AttachmentUtilConverter.toDto(attachmentIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.STRING,
			'tpattachment',
			tpattachment.toString(),
		);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgprincipal', flgprincipal);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityattachment.saverelation;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}
}
