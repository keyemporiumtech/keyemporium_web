import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserService } from './services/browser.service';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class ConfigModule {
	static forRoot() {
		return {
			ngModule: ConfigModule,
			providers: [BrowserService],
		};
	}
}
