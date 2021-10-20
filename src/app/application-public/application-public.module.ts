import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationPublicRoutingModule } from './application-public-routing.module';
import { KitModule, EnvironmentLoaderService } from '@ddc/kit';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RestModule } from '@ddc/rest';
import { LayoutPublicComponent } from './template/layout-public/layout-public.component';
import { HeaderPublicComponent } from './template/header-public/header-public.component';
import { FooterPublicComponent } from './template/footer-public/footer-public.component';
import { HomePublicComponent } from './pages/home-public/home-public.component';
import { TranslateModule } from '@ngx-translate/core';
import { ApplicationSharedModule } from '../application-shared/application-shared.module';
import { LoginComponent } from './pages/login/login.component';
import { LocalesystemModule } from '../modules/localesystem/localesystem.module';

@NgModule({
	declarations: [
		LayoutPublicComponent,
		HeaderPublicComponent,
		FooterPublicComponent,
		HomePublicComponent,
		LoginComponent,
	],
	imports: [
		CommonModule,
		ApplicationPublicRoutingModule,
		KitModule,
		RestModule,
		SharedModule,
		ApplicationSharedModule,
		TranslateModule,
		// forms
		FormsModule,
		ReactiveFormsModule,
		// modules
		LocalesystemModule.forRoot(),
	],
})
export class ApplicationPublicModule {
	constructor(environmentLoader: EnvironmentLoaderService) {
		environmentLoader.setEnviroment(environment);
	}
	static forRoot() {
		return {
			ngModule: ApplicationPublicModule,
			providers: [],
		};
	}
}
