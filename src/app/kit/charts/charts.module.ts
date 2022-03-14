import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
	declarations: [ChartComponent],
	imports: [CommonModule, NgxChartsModule],
	exports: [ChartComponent],
})
export class ChartsModule {
	static forRoot() {
		return {
			ngModule: ChartsModule,
			providers: [],
		};
	}
}
