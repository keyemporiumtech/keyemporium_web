import { Component } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BasePageComponent,
	EnumMessageType,
	MessageModel,
	MessageService,
	PreviousRouteService,
	StringTranslate,
} from '@ddc/kit';
import { Subscription, combineLatest, tap, of, map, switchMap } from 'rxjs';
import { VerificationKeysService } from '../../services/verification-keys.service';
import { QueryUtility, ResponseMessageInterface } from '@ddc/rest';
import { environment } from '../../../../../environments/environment';
import { AuthenticationService, UserAuthRequest } from '../../base/authentication.service';
import { UserService } from '../../services/user.service';

/**
 * Questa pagina si aspetta un parametro in query string così composto
 * btoa(JSON.stringify(UserAuthRequest)))
 *
 * Va estesa per cambiare lo stile del componente ddc-init-auth-2fa-generator
 */

@Component({
	selector: 'ddc-init-auth2fa-page',
	templateUrl: './auth2fa-page.component.html',
	styleUrls: ['./auth2fa-page.component.scss'],
})
export class Auth2faPageComponent extends BasePageComponent {
	appkeysName: string = '&copy; Keyemporium';
	// params for auth2fa
	token: string;
	applicationname: string;
	userIn: UserAuthRequest;

	// checks
	checkUser: boolean;
	checkApplication: boolean;

	// sub
	subCheck: Subscription;
	subGenerate: Subscription;
	subRegister: Subscription;

	// services
	previousRoute: PreviousRouteService;
	applicationStorage: ApplicationStorageService;
	messageService: MessageService;
	verificationKeysService: VerificationKeysService;
	authenticationService: AuthenticationService;
	userService: UserService;

	// MANAGE BACK URL
	toMessage: ResponseMessageInterface;
	// MANAGE REGISTER
	flagEvalRegister: boolean = true;

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		previousRoute: PreviousRouteService,
		applicationStorage: ApplicationStorageService,
		messageService: MessageService,
		verificationKeysService: VerificationKeysService,
		authenticationService: AuthenticationService,
		userService: UserService,
	) {
		super(applicationLogger, router, activatedRoute);
		this.previousRoute = previousRoute;
		this.applicationStorage = applicationStorage;
		this.messageService = messageService;
		this.verificationKeysService = verificationKeysService;
		this.authenticationService = authenticationService;
		this.userService = userService;
	}
	manageDataParams(data: Data) {}
	manageRouteParams(data: ParamMap) {}
	manageQueryParams(data: ParamMap) {
		const keyParam = atob(data.get('p1'));
		// const keyAppUser = atob(data.get('p2'));

		const objParam: UserAuthRequest = JSON.parse(keyParam);

		if (objParam && objParam.username) {
			this.applicationname = environment.clientId;
			this.userIn = objParam;
			this.check();
		} else {
			const message = new MessageModel(
				EnumMessageType.INFO,
				400,
				'MESSAGE.TITLE.INFO',
				'APP.AUTH2FA.USER_NOT_AUTH_PAGE',
			);
			if (this.toMessage && this.toMessage.routing && this.toMessage.routing.urlBack) {
				message.backUrl = this.toMessage.routing.urlBack;
			}
			this.messageService.sendSubjectMessage(message, environment.messages.idMessagePrincipal);
		}
	}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subCheck) {
			this.subCheck.unsubscribe();
		}
		if (this.subGenerate) {
			this.subGenerate.unsubscribe();
		}
		if (this.subRegister) {
			this.subRegister.unsubscribe();
		}
	}
	getClassName(): string {
		return 'Auth2faPageComponent';
	}

	check() {
		this.subCheck = combineLatest([
			this.verificationKeysService.checkUser(
				this.userIn.username,
				undefined,
				QueryUtility.fnResponseManager(undefined, QueryUtility.SKIP_ERROR_RES, {
					toMessage: this.toMessage,
				}),
			),
			this.verificationKeysService.checkApplication(
				this.applicationname,
				undefined,
				undefined,
				QueryUtility.fnResponseManager(undefined, QueryUtility.SKIP_ERROR_RES, {
					toMessage: this.toMessage,
				}),
			),
		]).subscribe((data) => {
			this.checkUser = data[0] ? true : false;
			this.checkApplication = data[1] ? true : false;
			if (!this.checkUser && this.checkApplication && this.flagEvalRegister) {
				this.evalRegister();
			} else if (this.checkUser && this.checkApplication) {
				this.evalLogin();
			} else {
				const messageText = !this.checkUser
					? new StringTranslate('APP.AUTH2FA.USER_NOT_FOUND', { appkeys: this.appkeysName })
					: !this.checkApplication
					? new StringTranslate('APP.AUTH2FA.APPLICATION_NOT_FOUND', { appkeys: this.appkeysName })
					: '';

				const message = new MessageModel(
					EnumMessageType.INFO,
					400,
					'MESSAGE.TITLE.INFO',
					messageText,
				);
				if (this.toMessage && this.toMessage.routing && this.toMessage.routing.urlBack) {
					message.backUrl = this.toMessage.routing.urlBack;
				}
				this.messageService.sendSubjectMessage(message, environment.messages.idMessagePrincipal);
			}
		});
	}

	evalRegister() {
		let $obs;
		if (this.userIn && this.userIn.username) {
			$obs = this.userService
				.unique(
					undefined,
					this.userIn.username,
					{
						flags: ['flgDecrypt', 'avoidEmptyPassclean'],
					},
					undefined,
					QueryUtility.fnResponseManager(undefined, QueryUtility.SKIP_ERROR_RES, {
						toMessage: this.toMessage,
					}),
				)
				.pipe(
					switchMap((user) => {
						if (!user) {
							return of(undefined);
						}
						user.password = user.passclean;
						user.passclean = undefined;
						return this.verificationKeysService.registermeApplication(
							user,
							undefined,
							QueryUtility.fnResponseManager(undefined, QueryUtility.SKIP_ERROR_RES, {
								toMessage: this.toMessage,
							}),
						);
					}),
				);
		} else {
			$obs = of(undefined);
		}

		this.subRegister = $obs.subscribe((id_user) => {
			if (id_user) {
				this.evalLogin();
			} else {
				const message = new MessageModel(
					EnumMessageType.INFO,
					400,
					'MESSAGE.TITLE.INFO',
					new StringTranslate('APP.AUTH2FA.USER_NOT_FOUND', { appkeys: this.appkeysName }),
				);
				if (this.toMessage && this.toMessage.routing && this.toMessage.routing.urlBack) {
					message.backUrl = this.toMessage.routing.urlBack;
				}
				this.messageService.sendSubjectMessage(message, environment.messages.idMessagePrincipal);
			}
		});
	}

	evalLogin() {
		let $obs;
		if (this.userIn && this.userIn.username && this.userIn.password) {
			$obs = this.authenticationService
				.loginAuth2fa(this.userIn, undefined, { toMessage: this.toMessage })
				.pipe(
					tap((res) => (res ? true : false)),
					map((resLogin) => {
						return resLogin ? this.applicationStorage.authtoken2FA.get() : undefined;
					}),
				);
		} else if (this.userIn && this.userIn.username) {
			$obs = this.verificationKeysService
				.getmeToken(
					this.userIn.username,
					undefined,
					QueryUtility.fnResponseManager(undefined, QueryUtility.SKIP_ERROR_RES, {
						toMessage: this.toMessage,
					}),
				)
				.pipe(
					map((token) => {
						this.applicationStorage.authtoken2FA.set(token);
						return token;
					}),
				);
		} else {
			$obs = of(undefined);
		}

		this.subGenerate = $obs.subscribe((token) => {
			this.token = token;
			if (!token) {
				const message = new MessageModel(
					EnumMessageType.INFO,
					400,
					'MESSAGE.TITLE.INFO',
					new StringTranslate('APP.AUTH2FA.USER_NOT_AUTH', { appkeys: this.appkeysName }),
				);
				if (this.toMessage && this.toMessage.routing && this.toMessage.routing.urlBack) {
					message.backUrl = this.toMessage.routing.urlBack;
				}
				this.messageService.sendSubjectMessage(message, environment.messages.idMessagePrincipal);
			}
		});
	}

	back() {
		this.previousRoute.back();
	}
}
