import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EsriGeoService } from './services/esri-geo.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, HttpClientModule],
})
export class EsriModule {
	static forRoot() {
		return {
			ngModule: EsriModule,
			providers: [EsriGeoService],
		};
	}
}
