import { Component } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import {
	ApplicationLoggerService,
	BasePageComponent,
	EnumMessageType,
	MessageModel,
	MessageService,
	PreviousRouteService,
	StringTranslate,
} from '@ddc/kit';
import { Subscription, combineLatest, switchMap, tap, of } from 'rxjs';
import { VerificationKeysService } from '../../services/verification-keys.service';
import { QueryUtility } from '@ddc/rest';
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

	constructor(
		applicationLogger: ApplicationLoggerService,
		router: Router,
		activatedRoute: ActivatedRoute,
		private verificationKeysService: VerificationKeysService,
		private userService: UserService,
		private authenticationService: AuthenticationService,
		private messageService: MessageService,
		private previousRoute: PreviousRouteService,
	) {
		super(applicationLogger, router, activatedRoute);
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
			this.messageService.sendSubjectMessage(
				new MessageModel(
					EnumMessageType.INFO,
					400,
					'MESSAGE.TITLE.INFO',
					'APP.AUTH2FA.USER_NOT_AUTH_PAGE',
				),
				environment.messages.idMessagePrincipal,
			);
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
	}
	getClassName(): string {
		return 'Auth2faPageComponent';
	}

	check() {
		this.subCheck = combineLatest([
			this.verificationKeysService.checkUser(
				this.userIn.username,
				undefined,
				QueryUtility.SKIP_ERROR_RES,
			),
			this.verificationKeysService.checkApplication(
				this.applicationname,
				undefined,
				undefined,
				QueryUtility.SKIP_ERROR_RES,
			),
		]).subscribe((data) => {
			this.checkUser = data[0] ? true : false;
			this.checkApplication = data[1] ? true : false;
			if (this.checkUser && this.checkApplication) {
				this.evalLogin();
			} else {
				const message = !this.checkUser
					? new StringTranslate('APP.AUTH2FA.USER_NOT_FOUND', { appkeys: this.appkeysName })
					: !this.checkApplication
					? new StringTranslate('APP.AUTH2FA.APPLICATION_NOT_FOUND', { appkeys: this.appkeysName })
					: '';
				this.messageService.sendSubjectMessage(
					new MessageModel(EnumMessageType.INFO, 400, 'MESSAGE.TITLE.INFO', message),
					environment.messages.idMessagePrincipal,
				);
			}
		});
	}

	evalLogin() {
		let $obs;
		if (this.userIn && this.userIn.username && this.userIn.password) {
			$obs = this.authenticationService.login(this.userIn).pipe(
				tap((res) => (res ? true : false)),
				switchMap((resLogin) => {
					return resLogin
						? this.verificationKeysService.getmeToken(
								this.userIn.username,
								undefined,
								QueryUtility.SKIP_ERROR_RES,
						  )
						: of(undefined);
				}),
			);
		} else if (this.userIn && this.userIn.username) {
			$obs = this.verificationKeysService.getmeToken(
				this.userIn.username,
				undefined,
				QueryUtility.SKIP_ERROR_RES,
			);
		} else {
			$obs = of(undefined);
		}

		this.subGenerate = $obs.subscribe((token) => {
			this.token = token;
			if (!token) {
				this.messageService.sendSubjectMessage(
					new MessageModel(
						EnumMessageType.INFO,
						400,
						'MESSAGE.TITLE.INFO',
						new StringTranslate('APP.AUTH2FA.USER_NOT_AUTH', { appkeys: this.appkeysName }),
					),
					environment.messages.idMessagePrincipal,
				);
			}
		});
	}

	back() {
		this.previousRoute.back();
	}
}
