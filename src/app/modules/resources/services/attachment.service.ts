import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestGroupsConditionsInterface } from '../../api/cakeutils/interfaces/request-groups-conditions.interface';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	FileService,
	InnerStorageService,
	MessageService,
	EnumTypeMime,
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
import { AttachmentModel } from '../models/attachment.model';
import { AttachmentConverter, AttachmentUtilConverter } from '../converters/attachment.converter';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { resourcesList } from '../constants/resources.list';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { TypologicalConverter } from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';

@Injectable()
export class AttachmentService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
		private fileService: FileService,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
		this.flgInnerToken = true;
	}

	unique(
		id?: string,
		cod?: string,
		name?: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<AttachmentModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_attachment', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'name', name);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + resourcesList.attachment.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new AttachmentConverter(),
			requestManager,
			responseManager,
		).pipe(
			map((res) => {
				this.memoInfoForAttachment(res);
				return res;
			}),
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
				: this.environment.api.services + resourcesList.attachment.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new AttachmentConverter()),
			requestManager,
			responseManager,
		).pipe(
			map((res) => {
				this.memoInfoForAttachments(res.list);
				return res;
			}),
		);
	}

	save(
		attachmentIn: AttachmentModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'attachment',
			AttachmentUtilConverter.toDto(attachmentIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + resourcesList.attachment.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		attachmentIn: AttachmentModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'attachment',
			AttachmentUtilConverter.toDto(attachmentIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_attachment', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + resourcesList.attachment.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_attachment', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + resourcesList.attachment.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// ---------------- TYPOLOGICAL
	tpattachment(
		paginator: RequestPaginatorInterface,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<TypologicalModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestCakeUtility.addPaginator(body, paginator);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + resourcesList.attachment.tpattachment;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new TypologicalConverter()),
			requestManager,
			responseManager,
		).pipe(
			map((res) => {
				return res ? res.list : [];
			}),
		);
	}

	// ----------------- UTILITY
	private memoInfoForAttachments(attachments: AttachmentModel[]) {
		if (attachments && attachments.length > 0) {
			for (const attachment of attachments) {
				this.memoInfoForAttachment(attachment);
			}
		}
	}
	private memoInfoForAttachment(attachment: AttachmentModel) {
		if (attachment) {
			if (attachment.size) {
				attachment.sizeFormat = this.fileService.getSizeFormatFromBytes(attachment.size);
			}
			if (attachment.content) {
				attachment.fileEmbed = this.fileService.buildFileEmbed(
					attachment.name,
					attachment.mimetype,
					attachment.type as EnumTypeMime,
					attachment.ext,
					attachment.content,
				);
			}
		}
	}
}
