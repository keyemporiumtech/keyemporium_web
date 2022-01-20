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
import { PicModel } from '../models/pic.model';
import { PicConverter } from '../converters/pic.converter';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { AppKeyemporiumList } from '../constants/app-keyemporium.list';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { ProfessionConverter } from '../../work-cv/converters/profession.converter';

@Injectable()
export class PicService extends ApiService {
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
		username?: string,
		flgprofessions?: boolean,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<PicModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgprofessions', flgprofessions);

		body = RequestCakeUtility.addConditions(body, conditions);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + AppKeyemporiumList.pic.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PicConverter(),
			requestManager,
			responseManager,
		);
	}

	professions(
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
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + AppKeyemporiumList.pic.professions;
		return this.getList(
			this.httpHeaders,
			url,
			body,
			new ProfessionConverter(),
			requestManager,
			responseManager,
		);
	}
}
