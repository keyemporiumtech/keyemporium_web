import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnvironmentLoaderService, KitModule } from '@ddc/kit';
import { RestModule } from '@ddc/rest';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { LineFilledComponent } from './components/line-filled/line-filled.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { SubTitleComponent } from './components/sub-title/sub-title.component';
import { UserProfilesDropdownComponent } from './components/user-profiles-dropdown/user-profiles-dropdown.component';
import { SexHtmlPipe } from './pipes/sex-html.pipe';

@NgModule({
	declarations: [
		PageContainerComponent,
		SexHtmlPipe,
		SubTitleComponent,
		LineFilledComponent,
		ConfirmationModalComponent,
		UserProfilesDropdownComponent,
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
		UserProfilesDropdownComponent,
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
