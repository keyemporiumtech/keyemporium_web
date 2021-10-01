import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, ApplicationLoggerService } from '@ddc/kit';
import {
	FacebookLoginProvider,
	GoogleLoginProvider,
	SocialUser,
	OAuthSocialService,
} from '@ddc/oauth-social';
import { Observable, from, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EnumOauthLoginType } from '../enums/oauth-login-type.enum';

@Injectable()
export class SocialLoginService extends BaseService {
	user: SocialUser;
	currentToken: string;
	type: EnumOauthLoginType;

	constructor(
		applicationLogger: ApplicationLoggerService,
		private authService: OAuthSocialService,
		private http: HttpClient,
	) {
		super(applicationLogger);
	}

	getClassName(): string {
		return 'SocialLoginService';
	}

	signInWithGoogle(): void {
		this.type = EnumOauthLoginType.GOOGLE;
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
	}

	signInWithFB(): void {
		this.type = EnumOauthLoginType.FACEBOOK;
		this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
	}

	signIn(type: EnumOauthLoginType) {
		switch (type) {
			case EnumOauthLoginType.GOOGLE:
				this.signInWithGoogle();
				break;
			case EnumOauthLoginType.FACEBOOK:
				this.signInWithFB();
				break;
			default:
				this.log.debug('signIn Warning', 'No type requested');
				break;
		}
	}
	signOut(): void {
		this.authService.signOut();
	}
	oauthInit(): Observable<boolean> {
		return this.authService.initState;
	}
	oauthUser(): Observable<SocialUser> {
		return this.authService.authState.pipe(
			switchMap((res) => {
				this.user = res;
				this.currentToken = res ? res.authToken : undefined;
				let $obsInfos: Observable<any>;
				if (this.currentToken) {
					$obsInfos = from(this.infos(this.type));
				} else {
					$obsInfos = of(undefined);
				}
				return $obsInfos.pipe(
					map((infos) => {
						if (this.user) {
							this.user.infos = infos;
						}
						return this.user;
					}),
				);
			}),
		);
	}

	infos(type: EnumOauthLoginType): Promise<SocialUser> {
		return new Promise((resolve, reject) => {
			try {
				let $infos;
				switch (type) {
					case EnumOauthLoginType.GOOGLE:
						$infos = this.authService.infos(GoogleLoginProvider.PROVIDER_ID);
						break;
					case EnumOauthLoginType.FACEBOOK:
						$infos = this.authService.infos(FacebookLoginProvider.PROVIDER_ID);
						break;
					default:
						$infos = new Promise((resolve1, reject1) => {
							reject1('No type for infos');
						});
						break;
				}

				$infos.then(
					(res) => {
						setTimeout(() => resolve(res), 2500);
					},
					(err) => {
						console.error('infos error', err);
						resolve(undefined);
					},
				);
			} catch (err) {
				reject(err);
			}
		});
	}
}
