import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentLoaderService, KitModule } from '@ddc/kit';
import { environment } from '../../environments/environment';
import { RestModule } from '@ddc/rest';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { SexHtmlPipe } from './pipes/sex-html.pipe';

@NgModule({
	declarations: [PageContainerComponent, SexHtmlPipe],
	imports: [
		CommonModule,
		KitModule,
		RestModule,
		SharedModule,
		TranslateModule,
		// forms
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [PageContainerComponent, SexHtmlPipe],
})
export class ApplicationSharedModule {
	constructor(environmentLoader: EnvironmentLoaderService) {
		environmentLoader.setEnviroment(environment);
	}
	static forRoot() {
		return {
			ngModule: ApplicationSharedModule,
			providers: [],
		};
	}
}
