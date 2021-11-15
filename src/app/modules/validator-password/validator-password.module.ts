import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordService } from './services/password.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitModule } from '@ddc/kit';
import { SharedModule } from '../../shared/shared.module';
import { ApiModule } from '../api/api.module';
import { TestValidatorPasswordComponent } from './components/test-validator-password/test-validator-password.component';
// tslint:disable-next-line:max-line-length
import { TestInputPasswordAsyncComponent } from './components/test-validator-password/test-input-password-async/test-input-password-async.component';
import { InputPasswordAsyncComponent } from './components/input-password-async/input-password-async.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
	declarations: [
		InputPasswordAsyncComponent,
		TestValidatorPasswordComponent,
		TestInputPasswordAsyncComponent,
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
		MarkdownModule,
	],
	exports: [
		InputPasswordAsyncComponent,
		TestValidatorPasswordComponent,
		TestInputPasswordAsyncComponent,
	],
})
export class ValidatorPasswordModule {
	static forRoot() {
		return {
			ngModule: ValidatorPasswordModule,
			providers: [PasswordService],
		};
	}
}
