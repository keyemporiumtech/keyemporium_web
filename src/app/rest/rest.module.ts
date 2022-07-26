import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ResponseModule } from './response/response.module';
import { AuthModule } from './auth/auth.module';
import { RequestModule } from './request/request.module';
import { InitialModule } from './initial/initial.module';
import { ChatModule } from './chat/chat.module';
import { PaginationModule } from './pagination/pagination.module';
import { KitModule } from '@ddc/kit';
import { ReferenceModule } from './reference/reference.module';
import { QueryModule } from './query/query.module';
import { OpenstreetmapModule } from './openstreetmap/openstreetmap.module';
import { EsriModule } from './esri/esri.module';
import { SocialModule } from './social/social.module';
import { MapsModule } from './maps/maps.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		KitModule,
		InitialModule.forRoot(),
		RequestModule.forRoot(),
		ResponseModule.forRoot(),
		AuthModule.forRoot(),
		ChatModule.forRoot(),
		PaginationModule.forRoot(),
		ReferenceModule.forRoot(),
		QueryModule.forRoot(),
		OpenstreetmapModule.forRoot(),
		EsriModule.forRoot(),
		SocialModule.forRoot(),
		MapsModule.forRoot(),
	],
	exports: [
		InitialModule,
		RequestModule,
		ResponseModule,
		AuthModule,
		ChatModule,
		PaginationModule,
		ReferenceModule,
		QueryModule,
		OpenstreetmapModule,
		EsriModule,
		SocialModule,
		MapsModule,
	],
})
export class RestModule {
	static forRoot() {
		return {
			ngModule: RestModule,
			providers: [],
		};
	}
}
