import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocaleService } from './services/locale.service';
import { ShowCurrencyPipe } from './pipes/show-currency.pipe';

@NgModule({
	declarations: [ShowCurrencyPipe],
	imports: [CommonModule],
	exports: [ShowCurrencyPipe],
})
export class LocaleModule {
	static forRoot() {
		return {
			ngModule: LocaleModule,
			providers: [LocaleService],
		};
	}
}
