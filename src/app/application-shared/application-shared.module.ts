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
import { SubTitleComponent } from './components/sub-title/sub-title.component';
import { LineFilledComponent } from './components/line-filled/line-filled.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
	declarations: [
		PageContainerComponent,
		SexHtmlPipe,
		SubTitleComponent,
		LineFilledComponent,
		ConfirmationModalComponent,
	],
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
	exports: [
		PageContainerComponent,
		SexHtmlPipe,
		SubTitleComponent,
		LineFilledComponent,
		ConfirmationModalComponent,
	],
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
