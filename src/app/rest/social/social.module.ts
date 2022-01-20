import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	OAuthSocialModule,
	SocialAuthServiceConfig,
	GoogleLoginProvider,
	FacebookLoginProvider,
} from '@ddc/oauth-social';
import { environment } from '../../../environments/environment';
import { SocialLoginService } from './services/social-login.service';

export function provideSocialConfig(): SocialAuthServiceConfig {
	return {
		autoLogin: false,
		providers: [
			{
				id: GoogleLoginProvider.PROVIDER_ID,
				provider: new GoogleLoginProvider(
					environment.social.google_oauth_flgssl
						? environment.social.google_oauth_client_id_ssl
						: environment.social.google_oauth_client_id,
					environment.social.google_oauth_scopes
						? { scope: environment.social.google_oauth_scopes.join(' ') }
						: undefined,
					environment.social.google_oauth_apiKey,
					environment.social.google_oauth_fields.join(','),
				),
			},
			{
				id: FacebookLoginProvider.PROVIDER_ID,
				provider: new FacebookLoginProvider(
					environment.social.facebook_oauth_app_id,
					environment.social.facebook_oauth_scopes
						? {
								scope: environment.social.facebook_oauth_scopes.join(','),
								return_scopes: true,
								enable_profile_selector: true,
						  }
						: undefined,
					environment.social.facebook_oauth_apiKey,
					environment.social.facebook_oauth_fields.join(','),
				),
			},
		],
		onError: (err) => {
			console.error(err);
		},
	} as SocialAuthServiceConfig;
}

@NgModule({
	declarations: [],
	imports: [CommonModule, OAuthSocialModule.forRoot(provideSocialConfig)],
	exports: [],
})
export class SocialModule {
	static forRoot() {
		return {
			ngModule: SocialModule,
			providers: [SocialLoginService],
		};
	}
}
