import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from './services/time.service';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class TimingModule {
	static forRoot() {
		return {
			ngModule: TimingModule,
			providers: [TimeService],
		};
	}
}
