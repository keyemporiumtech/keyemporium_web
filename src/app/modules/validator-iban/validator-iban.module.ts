import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IbanService } from './services/iban.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitModule } from '@ddc/kit';
import { SharedModule } from '../../shared/shared.module';
import { ApiModule } from '../api/api.module';
import { InputIbanComponent } from './components/input-iban/input-iban.component';
import { TestValidatorIbanComponent } from './components/test-validator-iban/test-validator-iban.component';
import { TestInputIbanComponent } from './components/test-validator-iban/test-input-iban/test-input-iban.component';

@NgModule({
	declarations: [InputIbanComponent, TestValidatorIbanComponent, TestInputIbanComponent],
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
	exports: [InputIbanComponent, TestValidatorIbanComponent, TestInputIbanComponent],
})
export class ValidatorIbanModule {
	static forRoot() {
		return {
			ngModule: ValidatorIbanModule,
			providers: [IbanService],
		};
	}
}
