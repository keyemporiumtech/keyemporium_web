import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';

declare let FB: any;

export class FacebookLoginProvider extends BaseLoginProvider {
	public static readonly PROVIDER_ID: string = 'FACEBOOK';

	private requestOptions = {
		scope: 'email,public_profile',
		locale: 'en_US',
		fields: 'name,email,picture,first_name,last_name,birthday,gender,hometown,link,location',
		version: 'v10.0',
	};

	others: { birthday?; gender?; hometown?; link?; location? };

	constructor(
		private clientId: string,
		initOptions: any = {},
		private apiKey: string,
		private fields?: string,
	) {
		super();
		if (this.fields) {
			this.requestOptions.fields = this.fields;
		}

		this.requestOptions = {
			...this.requestOptions,
			...initOptions,
		};
	}

	initialize(): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.loadScript(
					FacebookLoginProvider.PROVIDER_ID,
					`//connect.facebook.net/${this.requestOptions.locale}/sdk.js`,
					() => {
						FB.init({
							appId: this.clientId,
							autoLogAppEvents: true,
							cookie: true,
							xfbml: true,
							version: this.requestOptions.version,
						});

						resolve();
					},
				);
			} catch (err) {
				reject(err);
			}
		});
	}

	getLoginStatus(): Promise<SocialUser> {
		return new Promise((resolve, reject) => {
			FB.getLoginStatus((response: any) => {
				if (response.status === 'connected') {
					const authResponse = response.authResponse;
					FB.api(`/me?fields=${this.requestOptions.fields}`, (fbUser: any) => {
						const user: SocialUser = new SocialUser();

						user.origin = fbUser;

						user.id = fbUser.id;
						user.name = fbUser.name;
						user.email = fbUser.email;
						user.photoUrl =
							'https://graph.facebook.com/' +
							fbUser.id +
							'/picture?type=normal&access_token=' +
							authResponse.accessToken;
						user.firstName = fbUser.first_name;
						user.lastName = fbUser.last_name;
						user.authToken = authResponse.accessToken;

						user.response = authResponse;

						this.others = {
							birthday: fbUser.birthday ? fbUser.birthday : undefined,
							gender: fbUser.gender ? fbUser.gender : undefined,
							hometown: fbUser.hometown ? fbUser.hometown.name : undefined,
							link: fbUser.link ? fbUser.link : undefined,
							location: fbUser.location ? fbUser.location : undefined,
						};

						resolve(user);
					});
				} else {
					reject(`No user is currently logged in with ${FacebookLoginProvider.PROVIDER_ID}`);
				}
			});
		});
	}

	signIn(signInOptions?: any): Promise<SocialUser> {
		const options = { ...this.requestOptions, ...signInOptions };
		return new Promise((resolve, reject) => {
			FB.login((response: any) => {
				if (response.authResponse) {
					const authResponse = response.authResponse;
					FB.api(`/me?fields=${options.fields}`, (fbUser: any) => {
						const user: SocialUser = new SocialUser();

						user.origin = fbUser;

						user.id = fbUser.id;
						user.name = fbUser.name;
						user.email = fbUser.email;
						user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
						user.firstName = fbUser.first_name;
						user.lastName = fbUser.last_name;
						user.authToken = authResponse.accessToken;

						user.response = authResponse;

						this.others = {
							birthday: fbUser.birthday ? fbUser.birthday : undefined,
							gender: fbUser.gender ? fbUser.gender : undefined,
							hometown: fbUser.hometown ? fbUser.hometown : undefined,
							link: fbUser.link ? fbUser.link : undefined,
							location: fbUser.location ? fbUser.location : undefined,
						};

						resolve(user);
					});
				} else {
					reject('User cancelled login or did not fully authorize.');
				}
			}, options);
		});
	}

	signOut(): Promise<void> {
		return new Promise((resolve, reject) => {
			FB.logout((response: any) => {
				resolve();
			});
		});
	}

	// INFOS
	/**
	 * @see https://developers.facebook.com/docs/graph-api/reference/user
	 * @see https://developers.facebook.com/tools/explorer/
	 * @see https://developers.facebook.com/docs/app-review/submission-guide
	 */
	infos(): Promise<any> {
		return new Promise((resolve, reject) => {
			resolve(this.others);
		});
	}
}
