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
import { ValidatorPasswordModule } from '../modules/validator-password/validator-password.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ResourcesModule } from '../modules/resources/resources.module';
import { VicPageComponent } from './pages/vic-page/vic-page.component';
import { ProfileImageComponent } from './components/profile/profile-image/profile-image.component';
import { ProfileAddressComponent } from './components/profile/profile-address/profile-address.component';
import { LocalesystemModule } from '../modules/localesystem/localesystem.module';
import { ProfileCellComponent } from './components/profile/profile-cell/profile-cell.component';

@NgModule({
	declarations: [
		HomeReserveComponent,
		LayoutReserveComponent,
		HeaderReserveComponent,
		FooterReserveComponent,
		ProfileComponent,
		ProfileImageComponent,
		VicPageComponent,
		ProfileAddressComponent,
		ProfileCellComponent,
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
		ResourcesModule.forRoot(),
		LocalesystemModule.forRoot(),
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
