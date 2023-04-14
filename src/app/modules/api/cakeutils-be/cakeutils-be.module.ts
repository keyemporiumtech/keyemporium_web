import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { KitModule } from '@ddc/kit';
import { CakeutilsModule } from '../cakeutils/cakeutils.module';
import { CookiemanagerService } from './services/cookiemanager.service';
import { CryptnoteService } from './services/cryptnote.service';
import { GroupService } from './services/group.service';
import { GrouprelationService } from './services/grouprelation.service';
import { TestfkService } from './services/testfk.service';
import { TypologicalService } from './services/typological.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, CakeutilsModule, HttpClientModule, KitModule],
})
export class CakeutilsBeModule {
	static forRoot() {
		return {
			ngModule: CakeutilsBeModule,
			providers: [
				TestfkService,
				TypologicalService,
				CookiemanagerService,
				GroupService,
				GrouprelationService,
				CryptnoteService,
			],
		};
	}
}
