import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class RequestModule {
	static forRoot() {
		return {
			ngModule: RequestModule,
			providers: [],
		};
	}
}
