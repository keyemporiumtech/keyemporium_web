import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class StatisticModule {
	static forRoot() {
		return {
			ngModule: StatisticModule,
			providers: [],
		};
	}
}
