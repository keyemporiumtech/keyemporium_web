import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class TranslationModule {
	static forRoot() {
		return {
			ngModule: TranslationModule,
			providers: [],
		};
	}
}
