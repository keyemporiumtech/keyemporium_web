import { Component, Output, EventEmitter } from '@angular/core';
import { BaseComponent, ApplicationLoggerService } from '@ddc/kit';
import { SocialUser } from '@ddc/oauth-social';
import { Subscription, Observable, of } from 'rxjs';
import { SocialLoginService, EnumOauthLoginType } from '@ddc/rest';
import { switchMap, map } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { SocialLoginUtility } from '../../lib/social-login.utility';
import { OauthloginService } from '../../services/oauthlogin.service';
import { SocialLoginConverter } from '../../lib/social-login.converter';
import { SocialUserModel } from '../../lib/social-user.model';
import { AuthenticationService, UserAuthRequest } from '../../base/authentication.service';

@Component({
	selector: 'ddc-init-user-oauth',
	templateUrl: './user-oauth.component.html',
	styleUrls: ['./user-oauth.component.scss'],
})
export class UserOauthComponent extends BaseComponent {
	isReady: boolean;
	socialUser: SocialUser;
	isLoggedin: boolean;
	pageUser: UserModel;
	isLoggedinPage: boolean;
	// sub
	subAuthInit: Subscription;
	subAuthState: Subscription;
	subAuthLogout: Subscription;
	// emit
	@Output() socialUserEmit: EventEmitter<SocialUserModel> = new EventEmitter<SocialUserModel>();
	@Output() pageUserEmit: EventEmitter<UserModel> = new EventEmitter<UserModel>();

	constructor(
		applicationLogger: ApplicationLoggerService,
		private oauthloginService: OauthloginService,
		private oauthService: SocialLoginService,
		private authenticationService: AuthenticationService,
	) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		this.subAuthInit = this.oauthService.oauthInit().subscribe((res) => {
			this.isReady = res;
		});

		this.subAuthState = this.oauthService
			.oauthUser()
			.pipe(
				switchMap((socialuser) => {
					this.socialUser = socialuser;
					this.isLoggedin = socialuser != null;
					if (this.socialUser) {
						this.socialUserEmit.emit(
							SocialLoginConverter.toModelByOauth(this.socialUser, this.oauthService.type),
						);
						return this.check(this.socialUser, this.oauthService.type).pipe(
							map((user) => {
								this.pageUser = user;
								this.isLoggedinPage = user ? true : false;
								this.pageUserEmit.emit(this.pageUser);
								return this.socialUser;
							}),
						);
					} else {
						return of(this.socialUser);
					}
				}),
			)
			.subscribe();
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subAuthInit) {
			this.subAuthInit.unsubscribe();
		}
		if (this.subAuthState) {
			this.subAuthState.unsubscribe();
		}
		if (this.subAuthLogout) {
			this.subAuthLogout.unsubscribe();
		}
	}
	getClassName(): string {
		return 'UserOauthComponent';
	}

	// SIGN
	signInGoogle() {
		this.oauthService.signIn(EnumOauthLoginType.GOOGLE);
	}

	signInFacebook() {
		this.oauthService.signIn(EnumOauthLoginType.FACEBOOK);
	}

	signOut() {
		this.subAuthLogout = this.authenticationService.logout().subscribe((res) => {
			if (res) {
				this.oauthService.signOut();
				this.socialUserEmit.emit(undefined);
				this.pageUserEmit.emit(undefined);
			}
		});
	}

	check(socialUser: SocialUser, type: EnumOauthLoginType): Observable<UserModel> {
		return this.oauthloginService
			.check(
				SocialLoginConverter.toModelByOauth(socialUser, type),
				SocialLoginUtility.convertTypeSocialToEnum(type),
			)
			.pipe(
				switchMap((user) => {
					const userAuth: UserAuthRequest = {
						username: user.username,
						password: user.passclean,
						rememberme: true,
					};
					return this.authenticationService.login(userAuth).pipe(
						map((res) => {
							return res ? user : undefined;
						}),
					);
				}),
			);
	}
}
