import {
	BaseAuthService,
	ResponseMessageInterface,
	RequestManagerInterface,
	ResponseManagerInterface,
	AuthUtility,
	TokenDecodeInterface,
	PaginatorModel,
} from '@ddc/rest';
import { Injectable } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	InnerStorageService,
	BehaviourObserverModel,
} from '@ddc/kit';
import { restConstants } from '../../api/cakeutils/constants/rest.constants';
import { Observable, throwError, forkJoin, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { ConfirmoperationRequest } from '../dtos/confirmoperation-request';
import { PayloadUserInterface } from '../interfaces/payload-user.interface';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { UserprofileService } from '../services/userprofile.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { UserprofileModel } from '../models/userprofile.model';
import { UserModel } from '../models/user.model';
import { ProfilepermissionService } from '../services/profilepermission.service';
import { ApiFast } from '../../api/cakeutils/utility/api-fast.utility';
import { HttpClient } from '@angular/common/http';
import { ApiServiceUtility } from '../../api/cakeutils/utility/api-service.utility';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService extends BaseAuthService {
	http: HttpClient;
	translateService: TranslateService;
	userService: UserService;
	userprofileService: UserprofileService;
	profilepermissionService: ProfilepermissionService;

	constructor(
		applicationLogger: ApplicationLoggerService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
		translateService: TranslateService,
		userService: UserService,
		userprofileService: UserprofileService,
		profilepermissionService: ProfilepermissionService,
	) {
		super(applicationLogger, applicationStorage, innerStorage);
		this.http = http;
		this.translateService = translateService;
		this.userService = userService;
		this.userprofileService = userprofileService;
		this.profilepermissionService = profilepermissionService;
	}

	getDefaultMessage(): ResponseMessageInterface {
		return {
			subject: undefined,
			routing: { flg: true },
		};
	}
	getRequestNameForSessionTokenAuthentication(): string {
		return restConstants.sessiontokenname;
	}
	getResponseNameForSessionTokenAuthentication(): string {
		return restConstants.sessiontokenname;
	}

	// REGISTER
	register(
		user: UserModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		return super.register(user, requestManager, responseManager);
	}

	fnRegister(
		user: UserModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		return this.userService.save(user, requestManager, responseManager);
	}
	registerBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: string) => {};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}

	// LOGIN SENZA PIN
	login(
		user: UserAuthRequest,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<UserAuthResponse> {
		return super.login(user, requestManager, responseManager);
	}
	/**
	 * Funzione di login chiamata dal metodo di login
	 * @param user utente di login
	 * @param tokenAuthKeyResponse non viene usato perchè il metodo di login usato non memorizza il token in header ma lo ritorna come response
	 * @param requestManager request manager del login
	 * @param responseManager response manager del login
	 */
	fnLogin(
		user: UserAuthRequest,
		tokenAuthKeyResponse: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<UserAuthResponse> {
		return this.userService
			.login(
				user.username,
				user.password,
				user.rememberme,
				undefined,
				requestManager,
				responseManager,
			)
			.pipe(
				switchMap((authtoken) => {
					return this.completeLogin(authtoken, user, responseManager);
				}),
			);
	}
	loginBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: UserAuthResponse) => {
			return res;
		};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}

	getProfileFromLogin(body: UserAuthResponse): string {
		return body.payload.profile;
	}
	getUserLoggedByResponse(res: UserAuthResponse): PayloadUserInterface {
		return res.payload;
	}
	getUserLoggedIdByResponse(res: UserAuthResponse): string {
		return res.user.id;
	}
	getUserLoggedImageByResponse(res: UserAuthResponse): string {
		return undefined;
	}

	// LOGIN CON LA VERIFICA TRAMITE PIN
	loginPin(
		user: UserAuthRequest,
		confirm?: ConfirmoperationRequest,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		if (confirm) {
			user.confirm = confirm;
		}
		return super
			.loginVerify(user, requestManager, responseManager)
			.pipe(map((res) => (res ? true : false)));
	}
	fnLoginVerify(
		user: UserAuthRequest,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		return this.userService
			.login(
				user.username,
				user.password,
				user.rememberme,
				user.confirm,
				requestManager,
				ApiServiceUtility.handlePositiveMessage(responseManager),
			)
			.pipe(
				map((authtoken) => {
					const decodedToken: TokenDecodeInterface = AuthUtility.decodeTokenAuth(
						authtoken,
						environment.security.servername,
					);
					return decodedToken.auth;
				}),
			);
	}

	// conferma pin
	verifyPin(
		pin: string,
		user?: UserAuthRequest,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<UserAuthResponse> {
		const memoUser: UserAuthRequest = user ? user : this.applicationStorage.memoLogin.getObj();
		return this.userService
			.confirmLogin(memoUser.username, pin, requestManager, responseManager)
			.pipe(
				switchMap((authtoken) => {
					return this.completeLogin(authtoken, memoUser, responseManager).pipe(
						map((res) => {
							this.setProfile(this.getProfileFromLogin(res));
							this.applicationStorage.userLogged.setObj(this.getUserLoggedByResponse(res));
							this.applicationStorage.userId.set(this.getUserLoggedIdByResponse(res));
							this.applicationStorage.userImage.set(this.getUserLoggedImageByResponse(res));
							return res;
						}),
					);
				}),
			);
	}

	// SESSION
	checkSession(
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		return super.checkSession(requestManager, responseManager);
	}

	fnCheckSession(
		tokenAuthKeyRequest: string,
		tokenAuthValue: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		const payload: PayloadUserInterface = this.applicationStorage.userLogged.getObj();
		if (!payload) {
			return of(false);
		}
		if (!responseManager) {
			responseManager = {};
		}
		if (!responseManager.tokenManager) {
			responseManager.tokenManager = {};
		}
		responseManager.tokenManager.tokenKeyRequest = tokenAuthKeyRequest;
		responseManager.tokenManager.tokenValue = tokenAuthValue;
		return this.userService.checkSession(payload.username, requestManager, responseManager);
	}

	checkSessionBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: boolean) => {
			return res;
		};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}

	// LOGOUT
	logout(
		user?: PayloadUserInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		return super.logout(user, requestManager, responseManager);
	}

	fnLogout(
		user?: PayloadUserInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		const payload: PayloadUserInterface = user ? user : this.applicationStorage.userLogged.getObj();
		if (!payload) {
			return of(true);
		}
		return this.userService.logout(payload.username, requestManager, responseManager);
	}

	logoutBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: boolean) => {
			return res;
		};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}

	// PERMISSIONS
	loadPermissions(
		profile: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string[]> {
		return super.loadPermissions(profile, requestManager, responseManager);
	}

	fnLoadPermissions(
		profile?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string[]> {
		const conditions: RequestConditionInterface = {
			belongs: ['profile_fk', 'permission_fk'],
		};
		return this.profilepermissionService
			.paginate(
				ApiFast.paginatorList([ApiFast.queryField('profile_fk.cod', profile)]),
				conditions,
				requestManager,
				responseManager,
			)
			.pipe(
				map((paginatorModel) => {
					return paginatorModel && paginatorModel.list
						? paginatorModel.list.map((profilepermission) => profilepermission.permission.cod)
						: [];
				}),
			);
	}

	loadPermissionsBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: string[]) => {
			return res;
		};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}

	// SEDI : GESTIONE NON PREVISTA
	fnLoadSedi(
		profile: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		return of(undefined);
	}

	loadSediBehaviour(): BehaviourObserverModel {
		const funPre = () => {};
		const funOk = (res: any) => {
			return res;
		};
		const funError = (err: any) => {};
		return new BehaviourObserverModel(funPre, funOk, funError);
	}

	// VERIFY : GESTIONE NON PREVISTA
	// I servizi rest inviano automaticamente i codici di verifica pin e mail se previsti, quindi non è necessario gestirli

	fnVerifyPinEmail(
		pin: string,
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		return of(undefined);
	}
	fnVerifyPinPhone(
		pin: string,
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		return of(undefined);
	}
	fnSendVerifyPinEmail(
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		return of(undefined);
	}
	fnSendVerifyPinPhone(
		user: any,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		return of(undefined);
	}

	getClassName(): string {
		return 'AuthenticationService';
	}

	// OTHERS
	private completeLogin(
		authtoken: string,
		user: UserAuthRequest,
		responseManager: ResponseManagerInterface,
	): Observable<UserAuthResponse> {
		const decodedToken: TokenDecodeInterface = AuthUtility.decodeTokenAuth(
			authtoken,
			environment.security.servername,
		);
		if (decodedToken.auth) {
			// memorizzo authtoken e payload
			this.userService.evalToken(authtoken, responseManager);

			// uso i dati di decodifica per ottenere le info di profilo, utente e immagine
			const userPayload = JSON.parse(decodedToken.payload.data);
			const conditions: RequestConditionInterface = {
				belongs: ['user_fk', 'profile_fk'],
			};
			return forkJoin(
				this.userprofileService.paginate(
					ApiFast.paginatorList([
						ApiFast.queryField('user_fk.username', user.username),
						ApiFast.queryField('flgdefault', 1),
					]),
					conditions,
				),
				this.userService.unique(undefined, user.username),
				// TODO: Aggiungere user attachment
			).pipe(
				map((data) => {
					const userAuth: UserAuthResponse = {};
					const paginatorModel: PaginatorModel = data[0];
					userAuth.user = data[1];
					if (paginatorModel && paginatorModel.list && paginatorModel.list.length) {
						const userprofile: UserprofileModel = paginatorModel.list[0];
						userPayload.profile = userprofile.profile.cod;
						userAuth.userprofile = userprofile;
					}
					userAuth.payload = userPayload;
					return userAuth;
				}),
			);
		} else {
			return throwError(this.translateService.instant('MESSAGE.AUTH.TOKEN_NOT_VALID'));
		}
	}
}

export interface UserAuthRequest {
	username?: string;
	password?: string;
	rememberme?: boolean;
	confirm?: ConfirmoperationRequest;
}

export interface UserAuthResponse {
	user?: UserModel;
	userprofile?: UserprofileModel;
	payload?: PayloadUserInterface;
}
