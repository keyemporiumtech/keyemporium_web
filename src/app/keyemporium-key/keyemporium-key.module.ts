import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutKeyComponent } from './template/layout-key/layout-key.component';
import { HeaderKeyComponent } from './template/header-key/header-key.component';
import { FooterKeyComponent } from './template/footer-key/footer-key.component';
import { HomeKeyComponent } from './pages/home-key/home-key.component';
import { Auth2faKeyComponent } from './pages/auth2fa-key/auth2fa-key.component';
import { CaptchaKeyComponent } from './pages/captcha-key/captcha-key.component';
import { KeyemporiumKeyRoutingModule } from './keyemporium-key-routing.module';
import { KitModule } from '@ddc/kit';
import { RestModule } from '@ddc/rest';
import { SharedModule } from '../shared/shared.module';
import { ApplicationSharedModule } from '../application-shared/application-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from '../modules/authentication/authentication.module';
import { TestAuth2faComponent } from './components/test/test-auth2fa/test-auth2fa.component';
import { LoginApplicationComponent } from './components/login-application/login-application.component';
import { RegisterApplicationComponent } from './components/register-application/register-application.component';

@NgModule({
	declarations: [
		LayoutKeyComponent,
		HeaderKeyComponent,
		FooterKeyComponent,
		HomeKeyComponent,
		Auth2faKeyComponent,
		CaptchaKeyComponent,
		TestAuth2faComponent,
  LoginApplicationComponent,
  RegisterApplicationComponent,
	],
	imports: [
		CommonModule,
		KeyemporiumKeyRoutingModule,
		KitModule,
		RestModule,
		SharedModule,
		ApplicationSharedModule,
		TranslateModule,
		// forms
		FormsModule,
		ReactiveFormsModule,
		// modules
		AuthenticationModule.forRoot(),
	],
})
export class KeyemporiumKeyModule {
	static forRoot() {
		return {
			ngModule: KeyemporiumKeyModule,
			providers: [],
		};
	}
}
