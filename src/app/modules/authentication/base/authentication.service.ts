import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BehaviourObserverModel,
	FileService,
	InnerStorageService,
} from '@ddc/kit';
import {
	AuthUtility,
	BaseAuthService,
	PaginatorModel,
	QueryUtility,
	RequestManagerInterface,
	ResponseManagerInterface,
	ResponseMessageInterface,
	TokenDecodeInterface,
} from '@ddc/rest';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { restConstants } from '../../api/cakeutils/constants/rest.constants';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { ApiFast } from '../../api/cakeutils/utility/api-fast.utility';
import { ApiServiceUtility } from '../../api/cakeutils/utility/api-service.utility';
import { EnumAttachmentType } from '../../resources/enums/attachment-type.enum';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { ConfirmoperationRequest } from '../dtos/confirmoperation-request';
import { PayloadUserInterface } from '../interfaces/payload-user.interface';
import { UserModel } from '../models/user.model';
import { UserattachmentModel } from '../models/userattachment.model';
import { UserprofileModel } from '../models/userprofile.model';
import { ActivityService } from '../services/activity.service';
import { ProfilepermissionService } from '../services/profilepermission.service';
import { UserService } from '../services/user.service';
import { UserattachmentService } from '../services/userattachment.service';
import { UserprofileService } from '../services/userprofile.service';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService extends BaseAuthService {
	activityChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
	activity: Observable<string> = this.activityChange.asObservable();
	http: HttpClient;
	translateService: TranslateService;
	fileService: FileService;
	userService: UserService;
	userprofileService: UserprofileService;
	profilepermissionService: ProfilepermissionService;
	userattachmentService: UserattachmentService;
	activityService: ActivityService;

	constructor(
		applicationLogger: ApplicationLoggerService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
		translateService: TranslateService,
		fileService: FileService,
		userService: UserService,
		userprofileService: UserprofileService,
		profilepermissionService: ProfilepermissionService,
		userattachmentService: UserattachmentService,
		activityService: ActivityService,
	) {
		super(applicationLogger, applicationStorage, innerStorage);
		this.http = http;
		this.translateService = translateService;
		this.fileService = fileService;
		this.userService = userService;
		this.userprofileService = userprofileService;
		this.profilepermissionService = profilepermissionService;
		this.userattachmentService = userattachmentService;
		this.activityService = activityService;
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
		this.loginBehaviour().actionPre();
		return this.fnLogin(
			user,
			this.getResponseNameForSessionTokenAuthentication(),
			requestManager,
			responseManager,
		).pipe(
			map((res) => {
				this.setProfileWithActivity(this.getProfileFromLogin(res), this.getUsernameFromLogin(res));
				this.applicationStorage.userLogged.setObj(this.getUserLoggedByResponse(res));
				this.applicationStorage.userId.set(this.getUserLoggedIdByResponse(res));
				this.applicationStorage.userImage.set(this.getUserLoggedImageByResponse(res));
				return this.loginBehaviour().actionResponse(res);
			}),
		);
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
		return body && body.payload ? body.payload.profile : undefined;
	}
	getUserLoggedByResponse(body: UserAuthResponse): PayloadUserInterface {
		return body ? body.payload : undefined;
	}
	getUserLoggedIdByResponse(body: UserAuthResponse): string {
		return body && body.user ? body.user.id : undefined;
	}
	getUserLoggedImageByResponse(body: UserAuthResponse): string {
		return body && body.image
			? this.fileService.getBase64ByContent(body.image.content, body.image.mimetype)
			: undefined;
	}
	getUsernameFromLogin(body: UserAuthResponse): string {
		return body && body.payload ? body.payload.username : undefined;
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
							this.setProfileWithActivity(
								this.getProfileFromLogin(res),
								this.getUsernameFromLogin(res),
							);
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
		if (!responseManager) {
			responseManager = {};
		}
		super.sendTokenAuth(responseManager);
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
		if (!responseManager) {
			responseManager = {};
		}
		super.sendTokenAuth(responseManager);
		if (!requestManager) {
			requestManager = {};
		}
		const conditions: RequestConditionInterface = {
			belongs: ['profile_fk', 'permission_fk'],
		};
		return this.profilepermissionService
			.paginate(
				ApiFast.paginatorList([ApiFast.queryField('profile_fk.cod', profile)]),
				conditions,
				QueryUtility.fnRequestManager(undefined, ApiServiceUtility.sendUserInfo(requestManager)),
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

	// PROFILE
	changeProfile(
		username: string,
		profile: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		return super.changeProfile(username, profile, requestManager, responseManager);
	}

	fnChangeProfile(
		username: string,
		profile: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		if (!responseManager) {
			responseManager = {};
		}
		super.sendTokenAuth(responseManager);
		return this.userService.changeProfile(
			profile,
			undefined,
			username,
			requestManager,
			responseManager,
		);
	}

	changeProfileBehaviour(): BehaviourObserverModel {
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

	/**
	 * Svuota la cache di autenticazione utente
	 */
	emptyAuthSession() {
		super.emptyAuthSession();
		this.applicationStorage.activityPIVA.del();
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
			if (!responseManager) {
				responseManager = {};
			}
			// memorizzo authtoken e payload
			this.userService.evalToken(authtoken, responseManager);

			// preparo l'invio del token di login
			super.sendTokenAuth(responseManager);
			// uso i dati di decodifica per ottenere le info di profilo, utente e immagine
			const userPayload = JSON.parse(decodedToken.payload.data);
			const conditionsProfile: RequestConditionInterface = {
				belongs: ['user_fk', 'profile_fk'],
			};
			const conditionsAttachment: RequestConditionInterface = {
				belongs: ['attachment_fk'],
			};
			return combineLatest([
				this.userprofileService.paginate(
					ApiFast.paginatorList([
						ApiFast.queryField('user_fk.username', user.username),
						ApiFast.queryField('flgdefault', 1),
					]),
					conditionsProfile,
					undefined,
					responseManager,
				),
				this.userService.unique(undefined, user.username, undefined, undefined, responseManager),
				this.userattachmentService.principal(
					undefined,
					user.username,
					EnumAttachmentType.IMAGE,
					conditionsAttachment,
					undefined,
					QueryUtility.fnResponseManager(undefined, responseManager, QueryUtility.SKIP_ERROR_RES),
				),
			]).pipe(
				map((data) => {
					const userAuth: UserAuthResponse = {};
					const paginatorModel: PaginatorModel = data[0];
					if (paginatorModel && paginatorModel.list && paginatorModel.list.length) {
						const userprofile: UserprofileModel = paginatorModel.list[0];
						userPayload.profile = userprofile.profile.cod;
						userAuth.userprofile = userprofile;
					}

					userAuth.user = data[1];
					userAuth.payload = userPayload;

					const userAttachment: UserattachmentModel = data[2];
					if (userAttachment && userAttachment.attachment && userAttachment.attachment.id) {
						userAuth.image = userAttachment.attachment;
					}

					return userAuth;
				}),
			);
		} else {
			return throwError(this.translateService.instant('MESSAGE.AUTH.TOKEN_NOT_VALID'));
		}
	}

	// ---- MANAGE ACTIVITY
	checkActivity(piva?: string): Observable<string> {
		return piva ? of(piva) : this.activityService.profile();
	}

	changeActivity(username: string, piva?: string): Observable<string> {
		return this.checkActivity(piva).pipe(
			switchMap((pivaLogged) => {
				if (pivaLogged) {
					const responseManager: ResponseManagerInterface = {};
					super.sendTokenAuth(responseManager);
					return this.activityService
						.changeProfile(undefined, pivaLogged, undefined, username, undefined, responseManager)
						.pipe(
							map((res) => {
								return pivaLogged;
							}),
						);
				} else {
					return of(undefined);
				}
			}),
		);
	}

	setProfileWithActivity(profile: string, username?: string, piva?: string, callback?: () => any) {
		const $obsProfile = username ? this.changeProfile(username, profile) : of(true);
		const $obsActivity = username && piva ? this.changeActivity(username, piva) : of(undefined);
		this.subProfile = forkJoin([
			this.loadPermissions(profile),
			this.loadSedi(profile),
			$obsProfile,
			$obsActivity,
		]).subscribe((data) => {
			this.permissions = data[0];
			this.sedi = data[1];
			if (callback) {
				callback();
			}
			this.applicationStorage.profile.set(profile);
			this.profileChange.next(profile);
			this.applicationStorage.activityPIVA.set(data[3]);
			this.activityChange.next(data[3]);
		});
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
	image?: AttachmentModel;
}
