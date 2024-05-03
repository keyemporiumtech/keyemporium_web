import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { environment } from 'src/environments/environment';
import { EnvironmentLoaderService, MultiTranslateHttpLoader } from '@ddc/kit';
import { KitModule } from '@ddc/kit';
import { SharedModule } from './shared/shared.module';
import { RestModule } from '@ddc/rest';
import { InitModule } from './init/init.module';
import { ApiModule } from './modules/api/api.module';
import { ApplicationSharedModule } from './application-shared/application-shared.module';
import { CustomInterceptor } from './shared/services/custom.interceptor';
// import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
// import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

export function createTranslateLoader(http: HttpClient) {
	// console.log("system language:"+window.navigator.language);
	// return new TranslateHttpLoader(http, './assets/i18n/', '.json');

	return new MultiTranslateHttpLoader(
		http,
		[
			'./assets/i18n/application/',
			'./assets/i18n/validators/',
			'./assets/i18n/messages/',
			'./assets/i18n/interceptors/',
			'./assets/project/i18n/',
		],
		'.json',
	);
}
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		InitModule.forRoot(),
		KitModule.forRoot(),
		RestModule.forRoot(),
		SharedModule.forRoot(),
		ApplicationSharedModule.forRoot(),
		ApiModule.forRoot(),
		// ApplicationPublicModule.forRoot(),
		// ApplicationReserveModule.forRoot(),
		// translation
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient],
			},
		}),
		// SocialLoginModule,
	],
	providers: [
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy,
			// useClass: environment.production ? HashLocationStrategy : PathLocationStrategy,
		}, // Hash for reload on server
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CustomInterceptor,
			multi: true,
		},
		/*
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider('clientId'),
					},
					{
						id: FacebookLoginProvider.PROVIDER_ID,
						provider: new FacebookLoginProvider('clientId'),
					},
				],
			} as SocialAuthServiceConfig,
		},
    */
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(translate: TranslateService, environmentLoader: EnvironmentLoaderService) {
		translate.setDefaultLang(environment.default.language);
		translate.use(environment.default.language);
		environmentLoader.setEnviroment(environment);
	}
}
