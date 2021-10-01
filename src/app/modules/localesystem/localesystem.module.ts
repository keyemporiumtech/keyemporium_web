// tslint:disable:max-line-length
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KitModule, ApplicationStorageService } from '@ddc/kit';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { AppLanguagesComponent } from './components/app-languages/app-languages.component';
import { TestLocalesystemComponent } from './components/test-localesystem/test-localesystem.component';
import { TestAppLanguagesComponent } from './components/test-localesystem/test-app-languages/test-app-languages.component';
import { LanguageSystemService } from './base/language-system.service';
import { NationService } from './services/nation.service';
import { NationSystemService } from './base/nation-system.service';
import { AppNationsComponent } from './components/app-nations/app-nations.component';
import { TestAppNationsComponent } from './components/test-localesystem/test-app-nations/test-app-nations.component';
import { ApiInitService } from '../../init/services/api-init.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CityService } from './services/city.service';
import { AddressService } from './services/address.service';
import { MultilanguageService } from './services/multilanguage.service';
import { InputMultilanguageComponent } from './components/input-multilanguage/input-multilanguage.component';
import { TestInputMultilanguageComponent } from './components/test-localesystem/test-input-multilanguage/test-input-multilanguage.component';
import { InputAddressComponent } from './components/input-address/input-address.component';
import { TestInputAddressComponent } from './components/test-localesystem/test-input-address/test-input-address.component';

@NgModule({
	declarations: [
		AppLanguagesComponent,
		TestLocalesystemComponent,
		TestAppLanguagesComponent,
		AppNationsComponent,
		TestAppNationsComponent,
		InputMultilanguageComponent,
		TestInputMultilanguageComponent,
		InputAddressComponent,
		TestInputAddressComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		KitModule,
		SharedModule,
		ApiModule,
		// InitModule.forRoot(),
	],
	exports: [
		AppLanguagesComponent,
		TestLocalesystemComponent,
		TestAppLanguagesComponent,
		AppNationsComponent,
		TestAppNationsComponent,
		InputMultilanguageComponent,
		TestInputMultilanguageComponent,
		InputAddressComponent,
		TestInputAddressComponent,
	],
})
export class LocalesystemModule {
	constructor(
		private apiInit: ApiInitService,
		private applicationStorage: ApplicationStorageService,
		private languageService: LanguageService,
		private nationService: NationService,
	) {
		// LANGUAGE SYSTEM
		let languageStorage = this.applicationStorage.language.get();
		if (!languageStorage) {
			languageStorage = environment.default.language;
		}
		if (languageStorage) {
			this.apiInit.setLanguage(
				this.languageService.setup(languageStorage).pipe(
					map((data) => {
						return { cod: data.cod, name: data.title, payload: data };
					}),
				),
			);
		}

		// NATION SYSTEM
		let nationStorage = this.applicationStorage.nation.get();
		if (!nationStorage) {
			nationStorage = environment.default.nation;
		}
		if (nationStorage) {
			this.apiInit.setNation(
				this.nationService.unique(undefined, undefined, nationStorage).pipe(
					map((data) => {
						return { cod: data.cod_iso3166, name: data.name, payload: data };
					}),
				),
			);
		}
	}

	static forRoot() {
		return {
			ngModule: LocalesystemModule,
			providers: [
				LanguageService,
				LanguageSystemService,
				NationService,
				NationSystemService,
				CityService,
				AddressService,
				MultilanguageService,
			],
		};
	}
}
