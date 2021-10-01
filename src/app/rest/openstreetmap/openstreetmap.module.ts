import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OpenstreetmapService } from './services/openstreetmap.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, HttpClientModule],
})
export class OpenstreetmapModule {
	static forRoot() {
		return {
			ngModule: OpenstreetmapModule,
			providers: [OpenstreetmapService],
		};
	}
}
