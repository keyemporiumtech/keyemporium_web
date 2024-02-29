import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KitModule } from '@ddc/kit';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GooglerecaptchaService } from './services/googlerecaptcha.service';
import { CaptchaService } from './services/captcha.service';
import { InputRecaptchaComponent } from './components/input-recaptcha/input-recaptcha.component';
import { TestCaptchaComponent } from './components/test-captcha/test-captcha.component';
import { TestInputRecaptchaComponent } from './components/test-captcha/test-input-recaptcha/test-input-recaptcha.component';
import { TestInputCaptchaComponent } from './components/test-captcha/test-input-captcha/test-input-captcha.component';
import { InputCaptchaComponent } from './components/input-captcha/input-captcha.component';

@NgModule({
	declarations: [
		InputRecaptchaComponent,
		TestCaptchaComponent,
		TestInputRecaptchaComponent,
		TestInputCaptchaComponent,
		InputCaptchaComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		KitModule,
		SharedModule,
		ApiModule,
	],
	exports: [
		InputRecaptchaComponent,
		TestCaptchaComponent,
		TestInputRecaptchaComponent,
		TestInputCaptchaComponent,
		InputCaptchaComponent,
	],
})
export class CaptchaModule {
	static forRoot() {
		return {
			ngModule: CaptchaModule,
			providers: [GooglerecaptchaService, CaptchaService],
		};
	}
}
