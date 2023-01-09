import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from './services/time.service';
import { DateModelPipe } from './pipes/date-model.pipe';

@NgModule({
	declarations: [DateModelPipe],
	imports: [CommonModule],
	exports: [DateModelPipe],
})
export class TimingModule {
	static forRoot() {
		return {
			ngModule: TimingModule,
			providers: [TimeService],
		};
	}
}
