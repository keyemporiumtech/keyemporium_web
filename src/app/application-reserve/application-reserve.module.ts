import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentLoaderService, KitModule } from '@ddc/kit';
import { environment } from '../../environments/environment';
import { RestModule } from '@ddc/rest';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationSharedModule } from '../application-shared/application-shared.module';
import { ApplicationReserveRoutingModule } from './application-reserve-routing.module';
import { HomeReserveComponent } from './pages/home-reserve/home-reserve.component';
import { LayoutReserveComponent } from './template/layout-reserve/layout-reserve.component';
import { HeaderReserveComponent } from './template/header-reserve/header-reserve.component';
import { FooterReserveComponent } from './template/footer-reserve/footer-reserve.component';
import { AuthenticationModule } from '../modules/authentication/authentication.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ValidatorPasswordModule } from '../modules/validator-password/validator-password.module';

@NgModule({
	declarations: [
		HomeReserveComponent,
		LayoutReserveComponent,
		HeaderReserveComponent,
		FooterReserveComponent,
		ProfilePageComponent,
	],
	imports: [
		CommonModule,
		ApplicationReserveRoutingModule,
		KitModule,
		RestModule,
		SharedModule,
		ApplicationSharedModule,
		TranslateModule,
		// forms
		FormsModule,
		ReactiveFormsModule,
		// modules
		ValidatorPasswordModule.forRoot(),
		AuthenticationModule.forRoot(),
	],
})
export class ApplicationReserveModule {
	constructor(environmentLoader: EnvironmentLoaderService) {
		environmentLoader.setEnviroment(environment);
	}
	static forRoot() {
		return {
			ngModule: ApplicationReserveModule,
			providers: [],
		};
	}
}
