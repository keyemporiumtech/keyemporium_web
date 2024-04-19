import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KitModule } from '@ddc/kit';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BalanceService } from './services/balance.service';
import { PaymentmethodService } from './services/paymentmethod.service';
import { PaymentService } from './services/payment.service';
import { BalancepaymentService } from './services/balancepayment.service';
import { BasketService } from './services/basket.service';
import { BasketproductService } from './services/basketproduct.service';
import { BasketserviceService } from './services/basketservice.service';
import { BasketticketService } from './services/basketticket.service';
import { BasketpocketService } from './services/basketpocket.service';

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
export class ShopPaymentModule {
	static forRoot() {
		return {
			ngModule: ShopPaymentModule,
			providers: [
				BalanceService,
				PaymentmethodService,
				PaymentService,
				BalancepaymentService,
				BasketService,
				BasketproductService,
				BasketserviceService,
				BasketticketService,
				BasketpocketService,
			],
		};
	}
}
