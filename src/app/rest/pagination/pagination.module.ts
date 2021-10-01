import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class PaginationModule {
	static forRoot() {
		return {
			ngModule: PaginationModule,
			providers: [],
		};
	}
}
