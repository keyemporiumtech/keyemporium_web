import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class ValidatorsModule {
	static forRoot() {
		return {
			ngModule: ValidatorsModule,
			providers: [],
		};
	}
}
