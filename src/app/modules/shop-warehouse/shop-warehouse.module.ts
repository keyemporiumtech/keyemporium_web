import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KitModule } from '@ddc/kit';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrandService } from './services/brand.service';
import { BrandattachmentService } from './services/brandattachment.service';
import { BrandreferenceService } from './services/brandreference.service';
import { CategoryService } from './services/category.service';
import { CategoryattachmentService } from './services/categoryattachment.service';
import { DiscountService } from './services/discount.service';
import { PocketService } from './services/pocket.service';
import { PocketattachmentService } from './services/pocketattachment.service';
import { PocketdiscountService } from './services/pocketdiscount.service';
import { PocketproductService } from './services/pocketproduct.service';
import { PocketreservesettingService } from './services/pocketreservesetting.service';
import { PocketserviceService } from './services/pocketservice.service';
import { PockettaxService } from './services/pockettax.service';
import { PriceService } from './services/price.service';
import { ProductService } from './services/product.service';
import { ProductattachmentService } from './services/productattachment.service';
import { ProductdiscountService } from './services/productdiscount.service';
import { ProductreservesettingService } from './services/productreservesetting.service';
import { ProducttaxService } from './services/producttax.service';
import { ReservationsettingService } from './services/reservationsetting.service';
import { ServiceService } from './services/service.service';
import { ServiceattachmentService } from './services/serviceattachment.service';
import { ServicediscountService } from './services/servicediscount.service';
import { ServicereservesettingService } from './services/servicereservesetting.service';
import { ServicetaxService } from './services/servicetax.service';
import { TicketService } from './services/ticket.service';
import { TicketattachmentService } from './services/ticketattachment.service';
import { TicketdiscountService } from './services/ticketdiscount.service';
import { TicketreservesettingService } from './services/ticketreservesetting.service';
import { TickettaxService } from './services/tickettax.service';

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
export class ShopWarehouseModule {
	static forRoot() {
		return {
			ngModule: ShopWarehouseModule,
			providers: [
				BrandService,
				BrandattachmentService,
				BrandreferenceService,
				CategoryService,
				CategoryattachmentService,
				DiscountService,
				PocketService,
				PocketattachmentService,
				PocketdiscountService,
				PocketproductService,
				PocketreservesettingService,
				PocketserviceService,
				PockettaxService,
				PriceService,
				ProductService,
				ProductattachmentService,
				ProductdiscountService,
				ProductreservesettingService,
				ProducttaxService,
				ReservationsettingService,
				ServiceService,
				ServiceattachmentService,
				ServicediscountService,
				ServicereservesettingService,
				ServicetaxService,
				TicketService,
				TicketattachmentService,
				TicketdiscountService,
				TicketreservesettingService,
				TickettaxService,
			],
		};
	}
}
