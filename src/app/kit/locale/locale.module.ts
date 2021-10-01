import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocaleService } from './services/locale.service';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class LocaleModule {
	static forRoot() {
		return {
			ngModule: LocaleModule,
			providers: [LocaleService],
		};
	}
}
