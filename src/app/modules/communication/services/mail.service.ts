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
import { MailModel } from '../models/mail.model';
import { MailConverter, MailUtilConverter } from '../converters/mail.converter';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { communicationList } from '../constants/communication.list';
import { MailDetailConverter } from '../converters/mail-detail.converter';
import { MailUserModel } from '../models/mail-user.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { MailConfigModel } from '../models/mail-config.model';
import { MailUserConverter, MailUserUtilConverter } from '../converters/mail-user.converter';
import { AttachmentUtilConverter } from '../../resources/converters/attachment.converter';
import { MailConfigUtilConverter } from '../converters/mail-config.converter';

@Injectable()
export class MailService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
		this.flgInnerToken = true;
	}

	unique(
		id?: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<MailModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_mail', id);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + communicationList.mail.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new MailConverter(),
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
				: this.environment.api.services + communicationList.mail.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new MailConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		mailIn: MailModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'mail',
			MailUtilConverter.toDto(mailIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + communicationList.mail.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		mailIn: MailModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'mail',
			MailUtilConverter.toDto(mailIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_mail', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + communicationList.mail.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_mail', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + communicationList.mail.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// ---------------- DETAILED
	send(
		subject: string,
		message: string,
		senderIn: MailUserModel,
		destinatorsIn?: MailUserModel[],
		ccIn?: MailUserModel[],
		ccnIn?: MailUserModel[],
		attachmentsIn?: AttachmentModel[],
		cidsIn?: AttachmentModel[],
		mailerIn?: MailConfigModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'sender',
			MailUserUtilConverter.toDto(senderIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'subject', subject);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'destinators',
			MailUserUtilConverter.toDtoList(destinatorsIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'cc',
			MailUserUtilConverter.toDtoList(ccIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'ccn',
			MailUserUtilConverter.toDtoList(ccnIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'attachments',
			AttachmentUtilConverter.toDtoList(attachmentsIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'cids',
			AttachmentUtilConverter.toDtoList(cidsIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'message', message);
		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'mailer',
			MailConfigUtilConverter.toDto(mailerIn),
		);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + communicationList.mail.send;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	detail(
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<MailModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_mail', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + communicationList.mail.read;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new MailDetailConverter(),
			requestManager,
			responseManager,
		);
	}
	listDetail(
		paginator: RequestPaginatorInterface,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<PaginatorModel> {
		let body: HttpParams = new HttpParams();

		body = RequestCakeUtility.addPaginator(body, paginator);
		body = RequestCakeUtility.addConditions(body, conditions);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + communicationList.mail.list;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new MailDetailConverter()),
			requestManager,
			responseManager,
		);
	}
}
