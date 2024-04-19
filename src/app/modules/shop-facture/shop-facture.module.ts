import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KitModule } from '@ddc/kit';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BalancedocService } from './services/balancedoc.service';
import { BalancedocentryService } from './services/balancedocentry.service';
import { BalancedocpaymentService } from './services/balancedocpayment.service';
import { BalancedoctransportService } from './services/balancedoctransport.service';
import { BalanceindexService } from './services/balanceindex.service';
import { DocactorService } from './services/docactor.service';

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
export class ShopFactureModule {
	static forRoot() {
		return {
			ngModule: ShopFactureModule,
			providers: [BalancedocService, BalancedocentryService, BalancedocpaymentService, BalancedoctransportService, BalanceindexService, DocactorService],
		};
	}
}
