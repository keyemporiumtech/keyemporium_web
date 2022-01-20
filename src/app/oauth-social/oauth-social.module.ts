import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OAuthSocialService, SocialAuthServiceConfig } from './services/oauth-social.service';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class OAuthSocialModule {
	static forRoot(config: SocialAuthServiceConfig | Promise<SocialAuthServiceConfig> | any) {
		return {
			ngModule: OAuthSocialModule,
			providers: [
				OAuthSocialService,
				{
					provide: 'SocialAuthServiceConfig',
					useValue: config,
				},
			],
		};
	}
}
