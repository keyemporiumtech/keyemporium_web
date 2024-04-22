import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
	declarations: [RecaptchaComponent],
	imports: [CommonModule, RecaptchaModule],
	exports: [RecaptchaComponent],
})
export class GRecaptchaModule {
	static forRoot() {
		return {
			ngModule: GRecaptchaModule,
			providers: [],
		};
	}
}
