import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KitModule, ApplicationStorageService } from '@ddc/kit';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyService } from './services/currency.service';
import { ApiInitService } from '../../init/services/api-init.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@NgModule({
	declarations: [],
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
	exports: [],
})
export class UtilCurrencyModule {
	constructor(
		private apiInit: ApiInitService,
		private applicationStorage: ApplicationStorageService,
		private currencyService: CurrencyService,
	) {
		// CURRENCY SYSTEM
		let currencyStorage = this.applicationStorage.currency.get();
		if (!currencyStorage) {
			currencyStorage = environment.default.currency;
		}
		if (currencyStorage) {
			this.apiInit.setCurrency(
				this.currencyService.setup(currencyStorage).pipe(
					map((data) => {
						return { cod: data.cod, name: data.title, symbol: data.symbol, payload: data };
					}),
				),
			);
		}
	}
	static forRoot() {
		return {
			ngModule: UtilCurrencyModule,
			providers: [CurrencyService],
		};
	}
}
