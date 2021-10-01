import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerLayoutInfoComponent } from './components/logger-layout-info/logger-layout-info.component';
import { ApplicationLoggerService } from './services/application-logger.service';
import { LoggerService } from './services/logger.service';

@NgModule({
	declarations: [LoggerLayoutInfoComponent],
	imports: [CommonModule],
	exports: [LoggerLayoutInfoComponent],
})
export class LoggerModule {
	static forRoot() {
		return {
			ngModule: LoggerModule,
			providers: [LoggerService, ApplicationLoggerService],
		};
	}
}
