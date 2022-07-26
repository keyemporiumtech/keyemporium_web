import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageElementComponent } from './components/message-element/message-element.component';
import { MessagePageComponent } from './pages/message-page/message-page.component';
import { KitModule, EnvironmentLoaderService } from '@ddc/kit';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ErrorFieldComponent } from './components/error-field/error-field.component';
import { RestModule } from '@ddc/rest';
import { MapComponent } from './components/map/map.component';
import { AppLoadingComponent } from './components/app-loading/app-loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerCookieComponent } from './components/banner-cookie/banner-cookie.component';
import { ModalComponent } from './components/modal/modal.component';
import { FilePageComponent } from './pages/file-page/file-page.component';
import { FormSelectDivComponent } from './form/form-select-div/form-select-div.component';
import { ReloadPageComponent } from './pages/reload-page/reload-page.component';
import { FieldValidationComponent } from './form/field-validation/field-validation.component';
import { DdcValidationDirective } from './directives/form/ddc-validation.directive';
import { TableOrderComponent } from './pagination/table-order/table-order.component';
import { TablePaginateComponent } from './pagination/table-paginate/table-paginate.component';
import { TableListComponent } from './pagination/table-list/table-list.component';
import { InputGenericComponent } from './form/input-generic/input-generic.component';
import { InputSelectComponent } from './form/input-select/input-select.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { InputCheckboxComponent } from './form/input-checkbox/input-checkbox.component';
import { InputRadioComponent } from './form/input-radio/input-radio.component';
import { InputTextComponent } from './form/input-text/input-text.component';
import { InputNumberComponent } from './form/input-number/input-number.component';
import { InputDecimalComponent } from './form/input-decimal/input-decimal.component';
import { InputCurrencyComponent } from './form/input-currency/input-currency.component';
import { InputDateComponent } from './form/input-date/input-date.component';
import { DdcDateValidationDirective } from './directives/form/ddc-date-validation.directive';
import { InputTextareaComponent } from './form/input-textarea/input-textarea.component';
import { InputFileComponent } from './form/input-file/input-file.component';
import { InputAutocompleteComponent } from './form/input-autocomplete/input-autocomplete.component';
import { InputPhoneComponent } from './form/input-phone/input-phone.component';
import { InputEmailComponent } from './form/input-email/input-email.component';
import { BtsSizeDirective } from './directives/bootstrap/bts-size.directive';
import { AudioPlaylistComponent } from './components/audio-playlist/audio-playlist.component';
import { InputColorComponent } from './form/input-color/input-color.component';
import { InputPasswordComponent } from './form/input-password/input-password.component';
import { AddressSearchComponent } from './components/address-search/address-search.component';
import { CheckPlatformComponent } from './components/check-platform/check-platform.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CookieChoiceComponent } from './components/banner-cookie/cookie-choice/cookie-choice.component';
import { CookiePageComponent } from './pages/cookie-page/cookie-page.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { AccordionContainerComponent } from './components/accordion-container/accordion-container.component';
import { GmapComponent } from './components/gmap/gmap.component';

@NgModule({
	declarations: [
		MessageElementComponent,
		MessagePageComponent,
		ErrorFieldComponent,
		MapComponent,
		AppLoadingComponent,
		BannerCookieComponent,
		ModalComponent,
		FilePageComponent,
		FormSelectDivComponent,
		ReloadPageComponent,
		FieldValidationComponent,
		DdcValidationDirective,
		TableOrderComponent,
		TablePaginateComponent,
		InputGenericComponent,
		TableListComponent,
		InputSelectComponent,
		FormPageComponent,
		InputCheckboxComponent,
		InputRadioComponent,
		InputTextComponent,
		InputNumberComponent,
		InputDecimalComponent,
		InputCurrencyComponent,
		InputDateComponent,
		DdcDateValidationDirective,
		InputTextareaComponent,
		InputFileComponent,
		InputAutocompleteComponent,
		InputPhoneComponent,
		InputEmailComponent,
		BtsSizeDirective,
		AudioPlaylistComponent,
		InputColorComponent,
		InputPasswordComponent,
		AddressSearchComponent,
		CheckPlatformComponent,
		CookieChoiceComponent,
		CookiePageComponent,
		AccordionComponent,
		AccordionContainerComponent,
		GmapComponent,
	],
	imports: [
		CommonModule,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		DeviceDetectorModule.forRoot(),
		KitModule,
		RestModule,
	],
	exports: [
		DeviceDetectorModule,
		MessageElementComponent,
		MessagePageComponent,
		ErrorFieldComponent,
		MapComponent,
		AppLoadingComponent,
		BannerCookieComponent,
		ModalComponent,
		FilePageComponent,
		FormSelectDivComponent,
		ReloadPageComponent,
		FieldValidationComponent,
		DdcValidationDirective,
		TableOrderComponent,
		TablePaginateComponent,
		InputGenericComponent,
		TableListComponent,
		InputSelectComponent,
		FormPageComponent,
		InputCheckboxComponent,
		InputRadioComponent,
		InputTextComponent,
		InputNumberComponent,
		InputDecimalComponent,
		InputCurrencyComponent,
		InputDateComponent,
		DdcDateValidationDirective,
		InputTextareaComponent,
		InputFileComponent,
		InputAutocompleteComponent,
		InputPhoneComponent,
		InputEmailComponent,
		BtsSizeDirective,
		AudioPlaylistComponent,
		InputColorComponent,
		InputPasswordComponent,
		AddressSearchComponent,
		CheckPlatformComponent,
		CookieChoiceComponent,
		CookiePageComponent,
		AccordionComponent,
		AccordionContainerComponent,
		GmapComponent,
	],
})
export class SharedModule {
	constructor(environmentLoader: EnvironmentLoaderService) {
		environmentLoader.setEnviroment(environment);
	}
	static forRoot() {
		return {
			ngModule: SharedModule,
			providers: [],
		};
	}
}
