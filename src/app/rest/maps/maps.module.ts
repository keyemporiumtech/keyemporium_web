import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class MapsModule {
	static forRoot() {
		return {
			ngModule: MapsModule,
			providers: [],
		};
	}
}
