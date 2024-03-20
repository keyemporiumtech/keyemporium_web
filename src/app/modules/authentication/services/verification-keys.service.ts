import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	InnerStorageService,
	MessageService,
} from '@ddc/kit';
import { RequestManagerInterface, ResponseManagerInterface } from '@ddc/rest';
import { map, Observable } from 'rxjs';
import { ApiKeysService } from '../../api/cakeutils/base/api-keys.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestGroupsConditionsInterface } from '../../api/cakeutils/interfaces/request-groups-conditions.interface';
import { ApiFast } from '../../api/cakeutils/utility/api-fast.utility';
import { authenticationList } from '../constants/authentication.list';
import { ApplicationModel } from '../models/application.model';
import { Authentication2faModel } from '../models/authentication2fa.model';
import { UserModel } from '../models/user.model';
import { ApplicationService } from './application.service';
import { Authentication2faService } from './authentication2fa.service';
import { UserService } from './user.service';

@Injectable()
export class VerificationKeysService extends ApiKeysService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
		private applicationService: ApplicationService,
		private auth2faService: Authentication2faService,
		private userService: UserService,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
		this.flgInnerToken = false;
	}

	/*************** AUTH2FA/APPLICATION/KEYS ****************/

	/**
	 * Chiede un token di autenticazione all'applicazione keys
	 * @param username username da autenticare
	 * @param requestManager gestore richiesta
	 * @param responseManager gestore risposta
	 * @returns token di autenticazione
	 */
	getmeToken(
		username: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		if (!requestManager) {
			requestManager = {};
		}
		requestManager.url =
			this.environment.api.servicesKeys + authenticationList.application.generate;
		requestManager.headerParams = [
			{
				key: this.getRequestNameForAppTokenAuthentication(),
				value: this.getRequestValueForAppTokenAuthentication(),
			},
		];

		return this.applicationService.generate(
			this.environment.clientId,
			username,
			requestManager,
			responseManager,
		);
	}

	registermeApplication(
		userIn: UserModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		if (!requestManager) {
			requestManager = {};
		}
		requestManager.url = this.environment.api.servicesKeys + authenticationList.user.save;

		return this.userService.save(userIn, requestManager, responseManager, conditionsGroup);
	}

	generateCode(
		token: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<Authentication2faModel> {
		if (!requestManager) {
			requestManager = {};
		}
		requestManager.url =
			this.environment.api.servicesKeys + authenticationList.authentication2fa.generate;
		requestManager.headerParams = [
			{
				key: this.getRequestNameForAppTokenAuthentication(),
				value: this.getRequestValueForAppTokenAuthentication(),
			},
		];
		return this.auth2faService.generate(
			token,
			this.environment.clientId,
			requestManager,
			responseManager,
		);
	}

	verifyCode(
		token: string,
		cod: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		if (!requestManager) {
			requestManager = {};
		}
		requestManager.url =
			this.environment.api.servicesKeys + authenticationList.authentication2fa.check;

		requestManager.headerParams = [
			{
				key: this.getRequestNameForAppTokenAuthentication(),
				value: this.getRequestValueForAppTokenAuthentication(),
			},
		];

		return this.auth2faService.check(
			token,
			this.environment.clientId,
			cod,
			requestManager,
			responseManager,
		);
	}

	/*************** USER/APPLICATION ****************/

	checkUser(
		username: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<UserModel> {
		if (!requestManager) {
			requestManager = {};
		}
		requestManager.url = this.environment.api.servicesKeys + authenticationList.user.unique;

		requestManager.headerParams = [
			{
				key: this.getRequestNameForAppTokenAuthentication(),
				value: this.getRequestValueForAppTokenAuthentication(),
			},
		];

		return this.userService.unique(undefined, username, undefined, requestManager, responseManager);
	}

	checkApplication(
		appName?: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<ApplicationModel> {
		if (!requestManager) {
			requestManager = {};
		}
		requestManager.url =
			this.environment.api.servicesKeys + authenticationList.application.paginate;

		requestManager.headerParams = [
			{
				key: this.getRequestNameForAppTokenAuthentication(),
				value: this.getRequestValueForAppTokenAuthentication(),
			},
		];

		return this.applicationService
			.paginate(
				ApiFast.paginatorList([
					ApiFast.queryField('name', appName ? appName : this.environment.clientId),
				]),
				conditions,
				requestManager,
				responseManager,
				conditionsGroup,
			)
			.pipe(
				map((paginatorModel) => {
					return paginatorModel && paginatorModel.list && paginatorModel.list.length
						? paginatorModel.list[0]
						: undefined;
				}),
			);
	}
}
