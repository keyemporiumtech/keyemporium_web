/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikiTestRoutingModule } from './wiki-test-routing.module';
import { TestHomeComponent } from './pages/test-home/test-home.component';
import { TestCommonsPagesComponent } from './components/test-commons-pages/test-commons-pages.component';
import { SharedModule } from '../shared/shared.module';
import { TestCommonsPageFileComponent } from './components/test-commons-pages/test-commons-page-file/test-commons-page-file.component';
import { MarkdownModule } from 'ngx-markdown';
import { TestCommonsPageMessageComponent } from './components/test-commons-pages/test-commons-page-message/test-commons-page-message.component';
import { TestSharedComponent } from './components/test-shared/test-shared.component';
import { TestSharedBannerCookieComponent } from './components/test-shared/test-shared-banner-cookie/test-shared-banner-cookie.component';
import { TestLayoutComponent } from './components/test-layout/test-layout.component';
import { TestLayoutGridComponent } from './components/test-layout/test-layout-grid/test-layout-grid.component';
import { TestLayoutAlertsComponent } from './components/test-layout/test-layout-alerts/test-layout-alerts.component';
import { TestLayoutBadgesComponent } from './components/test-layout/test-layout-badges/test-layout-badges.component';
import { TestLayoutButtonsComponent } from './components/test-layout/test-layout-buttons/test-layout-buttons.component';
import { TestLayoutCardsComponent } from './components/test-layout/test-layout-cards/test-layout-cards.component';
import { TestFormComponent } from './components/test-shared/test-form/test-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestModulesComponent } from './pages/test-modules/test-modules.component';
import { TestModulesLegendaComponent } from './pages/test-modules/test-modules-legenda/test-modules-legenda.component';
import { TestDdcValidationComponent } from './components/test-shared/test-form/test-ddc-validation/test-ddc-validation.component';
import { TestInputGenericComponent } from './components/test-shared/test-form/test-input-generic/test-input-generic.component';
import { TestFormPageComponent } from './components/test-shared/test-form/test-form-page/test-form-page.component';
import { TestFormInputsComponent } from './components/test-shared/test-form/test-form-inputs/test-form-inputs.component';
import { TestLayoutLinesComponent } from './components/test-layout/test-layout-lines/test-layout-lines.component';
import { TestLayoutColorsComponent } from './components/test-layout/test-layout-colors/test-layout-colors.component';
import { TestKitComponent } from './components/test-kit/test-kit.component';
import { TestKitValidatorsComponent } from './components/test-kit/test-kit-validators/test-kit-validators.component';
import { TestPaginationComponent } from './components/test-shared/test-pagination/test-pagination.component';
import { TestPaginationSimpleComponent } from './components/test-shared/test-pagination/test-pagination-simple/test-pagination-simple.component';
import { TestPaginationDefaultComponent } from './components/test-shared/test-pagination/test-pagination-default/test-pagination-default.component';
import { TestPaginationMinimalComponent } from './components/test-shared/test-pagination/test-pagination-minimal/test-pagination-minimal.component';
import { VersioningComponent } from './components/versioning/versioning.component';
// MODULES
import { ApiModule } from '../modules/api/api.module';
import { TestSharedPlaylistComponent } from './components/test-shared/test-shared-playlist/test-shared-playlist.component';
import { TestSharedPlaylistAudioComponent } from './components/test-shared/test-shared-playlist/test-shared-playlist-audio/test-shared-playlist-audio.component';
import { TestKitHtmlComponent } from './components/test-kit/test-kit-html/test-kit-html.component';
import { KitModule } from '@ddc/kit';
import { ResourcesModule } from '../modules/resources/resources.module';
import { CommunicationModule } from '../modules/communication/communication.module';
import { AuthenticationModule } from '../modules/authentication/authentication.module';
import { LocalesystemModule } from '../modules/localesystem/localesystem.module';
import { ValidatorIbanModule } from '../modules/validator-iban/validator-iban.module';
import { ValidatorCreditcardModule } from '../modules/validator-creditcard/validator-creditcard.module';
import { TestSharedMapComponent } from './components/test-shared/test-shared-map/test-shared-map.component';
import { TestRestComponent } from './components/test-rest/test-rest.component';
import { TestRestOpenstreetmapComponent } from './components/test-rest/test-rest-openstreetmap/test-rest-openstreetmap.component';
import { TestSharedAddressSearchComponent } from './components/test-shared/test-shared-address-search/test-shared-address-search.component';
import { TestRestOauthLoginComponent } from './components/test-rest/test-rest-oauth-login/test-rest-oauth-login.component';
import { ValidatorPasswordModule } from '../modules/validator-password/validator-password.module';
import { TestKitChartsComponent } from './components/test-kit/test-kit-charts/test-kit-charts.component';
import { TestKitRoutingComponent } from './components/test-kit/test-kit-routing/test-kit-routing.component';
import { TestKitTreeHtmlComponent } from './components/test-kit/test-kit-tree-html/test-kit-tree-html.component';
import { TestKitQrcodeComponent } from './components/test-kit/test-kit-qrcode/test-kit-qrcode.component';
@NgModule({
	declarations: [
		TestHomeComponent,
		TestCommonsPagesComponent,
		TestCommonsPageFileComponent,
		TestCommonsPageMessageComponent,
		TestSharedComponent,
		TestSharedBannerCookieComponent,
		TestLayoutComponent,
		TestLayoutGridComponent,
		TestLayoutAlertsComponent,
		TestLayoutBadgesComponent,
		TestLayoutButtonsComponent,
		TestLayoutCardsComponent,
		TestFormComponent,
		TestModulesComponent,
		TestModulesLegendaComponent,
		TestDdcValidationComponent,
		TestInputGenericComponent,
		TestFormPageComponent,
		TestFormInputsComponent,
		TestLayoutLinesComponent,
		TestLayoutColorsComponent,
		TestKitComponent,
		TestKitValidatorsComponent,
		TestPaginationComponent,
		TestPaginationSimpleComponent,
		TestPaginationDefaultComponent,
		TestPaginationMinimalComponent,
		TestSharedPlaylistComponent,
		TestSharedPlaylistAudioComponent,
		TestKitHtmlComponent,
		TestSharedMapComponent,
		TestRestComponent,
		TestRestOpenstreetmapComponent,
		TestSharedAddressSearchComponent,
		VersioningComponent,
		TestRestOauthLoginComponent,
		TestKitChartsComponent,
		TestKitRoutingComponent,
		TestKitTreeHtmlComponent,
		TestKitQrcodeComponent,
	],
	imports: [
		CommonModule,
		WikiTestRoutingModule, // markdown
		MarkdownModule.forRoot(),
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		// MODULES
		ApiModule,
		KitModule,
		ResourcesModule.forRoot(),
		CommunicationModule.forRoot(),
		AuthenticationModule.forRoot(),
		LocalesystemModule.forRoot(),
		ValidatorIbanModule.forRoot(),
		ValidatorCreditcardModule.forRoot(),
		ValidatorPasswordModule.forRoot(),
	],
})
export class WikiTestModule {
	static forRoot() {
		return {
			ngModule: WikiTestModule,
			providers: [],
		};
	}
}
