import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class QueryModule {
	static forRoot() {
		return {
			ngModule: QueryModule,
			providers: [],
		};
	}
}
