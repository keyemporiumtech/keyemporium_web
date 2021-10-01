import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class ReferenceModule {
	static forRoot() {
		return {
			ngModule: ReferenceModule,
			providers: [],
		};
	}
}
