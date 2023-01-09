import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';

declare let gapi: any;

export class GoogleLoginProvider extends BaseLoginProvider {
	public static readonly PROVIDER_ID: string = 'GOOGLE';

	protected auth2: any;
	protected client: any;
	protected clientLoaded: boolean;

	constructor(
		private clientId: string,
		private initOptions: any = { scope: 'email' },
		private apiKey: string,
		private fields?: string,
	) {
		super();
	}

	initialize(): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.loadScript(
					GoogleLoginProvider.PROVIDER_ID,
					'https://apis.google.com/js/platform.js',
					() => {
						gapi.load('auth2', () => {
							this.auth2 = gapi.auth2.init({
								...this.initOptions,
								client_id: this.clientId,
							});

							this.auth2
								.then(() => {
									this.getClient();
									resolve();
								})
								.catch((err: any) => {
									reject(err);
								});
						});
					},
				);
			} catch (err) {
				reject(err);
			}
		});
	}

	getLoginStatus(loginStatusOptions?: any): Promise<SocialUser> {
		const options = { ...this.initOptions, ...loginStatusOptions };

		return new Promise((resolve, reject) => {
			if (this.auth2.isSignedIn.get()) {
				const user: SocialUser = new SocialUser();

				user.origin = this.auth2.currentUser.get();

				const profile = this.auth2.currentUser.get().getBasicProfile();
				const authResponse = this.auth2.currentUser.get().getAuthResponse(true); // get complete authResponse object
				const grantedScopes = this.auth2.currentUser.get().getGrantedScopes();
				const hostedDomain = this.auth2.currentUser.get().getHostedDomain();

				user.id = profile.getId();
				user.name = profile.getName();
				user.email = profile.getEmail();
				user.photoUrl = profile.getImageUrl();
				user.firstName = profile.getGivenName();
				user.lastName = profile.getFamilyName();
				user.response = authResponse;

				// eslint-disable-next-line @typescript-eslint/no-shadow
				const resolveUser = (authResponse) => {
					user.authToken = authResponse.access_token;
					user.idToken = authResponse.id_token;

					resolve(user);
				};

				if (options.refreshToken) {
					this.auth2.currentUser.get().reloadAuthResponse().then(resolveUser);
				} else {
					const res = this.auth2.currentUser.get().getAuthResponse(true);
					resolveUser(res);
				}
			} else {
				reject(`No user is currently logged in with ${GoogleLoginProvider.PROVIDER_ID}`);
			}
		});
	}

	signIn(signInOptions?: any): Promise<SocialUser> {
		const options = { ...this.initOptions, ...signInOptions };

		return new Promise((resolve, reject) => {
			const offlineAccess: boolean = options && options.offline_access;
			const promise = !offlineAccess
				? this.auth2.signIn(signInOptions)
				: this.auth2.grantOfflineAccess(signInOptions);

			promise
				.then(
					(response: any) => {
						const user: SocialUser = new SocialUser();

						if (response && response.code) {
							user.authorizationCode = response.code;
						} else {
							user.origin = this.auth2.currentUser.get();

							const profile = this.auth2.currentUser.get().getBasicProfile();
							const authResponse = this.auth2.currentUser.get().getAuthResponse(true);
							// const grantedScopes = this.auth2.currentUser.get().getGrantedScopes();
							// const hostedDomain = this.auth2.currentUser.get().getHostedDomain();
							const token = authResponse.access_token;
							const backendToken = authResponse.id_token;

							user.id = profile.getId();
							user.name = profile.getName();
							user.email = profile.getEmail();
							user.photoUrl = profile.getImageUrl();
							user.firstName = profile.getGivenName();
							user.lastName = profile.getFamilyName();
							user.authToken = token;
							user.idToken = backendToken;

							user.response = authResponse;
						}

						resolve(user);
					},
					(closed: any) => {
						reject(closed);
					},
				)
				.catch((err: any) => {
					reject(err);
				});
		});
	}

	signOut(revoke?: boolean): Promise<void> {
		return new Promise((resolve, reject) => {
			let signOutPromise: Promise<any>;

			if (revoke) {
				signOutPromise = this.auth2.disconnect();
			} else {
				signOutPromise = this.auth2.signOut();
			}

			signOutPromise
				.then((err: any) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				})
				.catch((err: any) => {
					reject(err);
				});
		});
	}

	// INFOS
	/**
	 * Used into initialize to call Api rest discovery
	 * @see https://developers.google.com/people/api/rest/v1/people/get
	 * @see https://github.com/google/google-api-javascript-client/blob/master/docs/samples.md
	 */
	getClient() {
		gapi.load('client', () => {
			gapi.client.setApiKey(this.apiKey);

			this.client = gapi.client.load('https://people.googleapis.com/$discovery/rest?version=v1');

			this.client
				.then(() => {
					this.clientLoaded = true;
					// console.error('client loaded');
				})
				.catch((err: any) => {
					this.clientLoaded = false;
					// console.error('client errore', err);
				});
		});
	}

	/**
	 * Get user info
	 * @see https://developers.google.com/people/api/rest/v1/people#Person
	 * @see https://developers.google.com/people/api/rest/v1/people/get
	 * @returns google person
	 */
	infos(): Promise<any> {
		const fields = this.fields
			? this.fields
			: 'addresses,ageRanges,biographies,birthdays,genders,phoneNumbers';
		return new Promise((resolve, reject) => {
			gapi.client.people.people
				.get({
					resourceName: 'people/me',
					personFields: fields,
				})
				.then(
					function (response) {
						// Handle the results here (response.result has the parsed body).
						resolve(response.result);
					},
					function (err) {
						reject(err);
					},
				);
		});
	}
}
