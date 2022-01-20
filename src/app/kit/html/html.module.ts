import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DdcContenteditableDirective } from './directives/ddc-contenteditable.directive';
import { EscapeHtmlPipe } from './pipes/escape-html.pipe';
import { EscapeUrlPipe } from './pipes/escape-url.pipe';
import { ProgressComponent } from './components/progress/progress.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingCircleComponent } from './components/loading/loading-circle/loading-circle.component';
import { LoadingDualRingComponent } from './components/loading/loading-dual-ring/loading-dual-ring.component';
import { LoadingFbComponent } from './components/loading/loading-fb/loading-fb.component';
import { LoadingHeartComponent } from './components/loading/loading-heart/loading-heart.component';
import { LoadingRingComponent } from './components/loading/loading-ring/loading-ring.component';
import { LoadingRollerComponent } from './components/loading/loading-roller/loading-roller.component';
import { LoadingDefaultComponent } from './components/loading/loading-default/loading-default.component';
import { LoadingEllipsisComponent } from './components/loading/loading-ellipsis/loading-ellipsis.component';
import { LoadingGridComponent } from './components/loading/loading-grid/loading-grid.component';
import { LoadingHourglassComponent } from './components/loading/loading-hourglass/loading-hourglass.component';
import { LoadingRippleComponent } from './components/loading/loading-ripple/loading-ripple.component';
import { LoadingSpinnerComponent } from './components/loading/loading-spinner/loading-spinner.component';
import { DdcInputPasswordDirective } from './directives/ddc-input-password.directive';
import { RenderElService } from './services/render-el.service';
import { BannerComponent } from './components/banner/banner.component';
import { TranslateModule } from '@ngx-translate/core';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { DdcCssVarDirective } from './directives/ddc-css-var.directive';

@NgModule({
	declarations: [
		DdcContenteditableDirective,
		DdcInputPasswordDirective,
		DdcCssVarDirective,
		EscapeHtmlPipe,
		EscapeUrlPipe,
		ProgressComponent,
		// components - loading
		LoadingComponent,
		LoadingCircleComponent,
		LoadingDualRingComponent,
		LoadingFbComponent,
		LoadingHeartComponent,
		LoadingRingComponent,
		LoadingRollerComponent,
		LoadingDefaultComponent,
		LoadingEllipsisComponent,
		LoadingGridComponent,
		LoadingHourglassComponent,
		LoadingRippleComponent,
		LoadingSpinnerComponent,
		BannerComponent,
		AutocompleteComponent,
		ProgressBarComponent,
	],
	imports: [
		CommonModule,
		TranslateModule,
		// forms
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [
		DdcContenteditableDirective,
		DdcInputPasswordDirective,
		DdcCssVarDirective,
		EscapeHtmlPipe,
		EscapeUrlPipe,
		ProgressComponent,
		// components - loading
		LoadingComponent,
		LoadingCircleComponent,
		LoadingDualRingComponent,
		LoadingFbComponent,
		LoadingHeartComponent,
		LoadingRingComponent,
		LoadingRollerComponent,
		LoadingDefaultComponent,
		LoadingEllipsisComponent,
		LoadingGridComponent,
		LoadingHourglassComponent,
		LoadingRippleComponent,
		LoadingSpinnerComponent,
		BannerComponent,
		AutocompleteComponent,
		ProgressBarComponent,
	],
})
export class HtmlModule {
	static forRoot() {
		return {
			ngModule: HtmlModule,
			providers: [RenderElService],
		};
	}
}
