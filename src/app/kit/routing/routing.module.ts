import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviousRouteService } from './services/previous-route.service';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class RoutingModule {
	static forRoot() {
		return {
			ngModule: RoutingModule,
			providers: [PreviousRouteService],
		};
	}
}
