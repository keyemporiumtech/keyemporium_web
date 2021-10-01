import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocialLoginService, EnumOauthLoginType } from '@ddc/rest';
import { Subscription } from 'rxjs';
import { SocialUser } from '@ddc/oauth-social';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'wiki-test-rest-oauth-login',
	templateUrl: './test-rest-oauth-login.component.html',
	styleUrls: ['./test-rest-oauth-login.component.scss'],
})
export class TestRestOauthLoginComponent implements OnInit, OnDestroy {
	isReady: boolean;
	socialUser: SocialUser;
	isLoggedin: boolean;
	// sub
	subAuthInit: Subscription;
	subAuthState: Subscription;

	constructor(private oauthService: SocialLoginService, private http: HttpClient) {}

	ngOnInit() {
		this.subAuthInit = this.oauthService.oauthInit().subscribe((res) => {
			this.isReady = res;
		});
		this.subAuthState = this.oauthService.oauthUser().subscribe((user) => {
			this.socialUser = user;
			this.isLoggedin = user != null;
			console.error('User', this.socialUser);
			if (this.socialUser && this.oauthService.type === EnumOauthLoginType.FACEBOOK) {
				// this.checkLocation(this.socialUser.id, this.socialUser.authToken);
				// this.checkPage(this.socialUser.id, this.socialUser.authToken);
			}
		});
	}

	ngOnDestroy() {
		if (this.subAuthInit) {
			this.subAuthInit.unsubscribe();
		}
		if (this.subAuthState) {
			this.subAuthState.unsubscribe();
		}
	}

	signInGoogle() {
		this.oauthService.signIn(EnumOauthLoginType.GOOGLE);
	}

	signInFacebook() {
		this.oauthService.signIn(EnumOauthLoginType.FACEBOOK);
	}

	signOut() {
		this.oauthService.signOut();
	}

	checkInfosGoogle() {
		if (this.socialUser) {
			this.oauthService.infos(EnumOauthLoginType.GOOGLE).then((res) => {
				console.error('Infos called', res);
			});
		}
	}

	checkInfosFacebook() {
		if (this.socialUser) {
			this.oauthService.infos(EnumOauthLoginType.FACEBOOK).then((res) => {
				console.error('Infos called', res);
			});
		}
	}

	checkLocation(id: string, token: string) {
		this.http
			.get(
				'https://graph.facebook.com/v10.0/' +
					id +
					'?fields=location{location{city,state,region_id}}&access_token=' +
					token,
			)
			.subscribe((res) => {
				console.error('location', res);
			});
	}

	checkPage(id: string, token: string) {
		id =
			// tslint:disable-next-line:max-line-length
			'YXNpZADpBWEY4Y0JPN2RPVWJESmhIc1VHWVFiVDRUMVp4TXpmRDFRbW13RDZADMUExdzVmaFdxTG9xdEhYQml6NDdNdC1HckVZAWlo4a1VZAZA3h5SldMRVkzd2djaWhhQ21kS1hzcThKLUxGQ05ZAenFB';
		this.http
			.get('https://graph.facebook.com/' + id + '&access_token=' + token)
			.subscribe((res) => {
				console.error('location', res);
			});
	}
}
