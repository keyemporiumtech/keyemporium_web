import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from '@ddc/kit';

@Component({
	selector: 'ddc-init-reload-page',
	templateUrl: './reload-page.component.html',
	styleUrls: ['./reload-page.component.scss'],
})
export class ReloadPageComponent implements OnInit {
	constructor(private previousRouteService: PreviousRouteService) {
		this.previousRouteService.back();
	}

	ngOnInit() {}
}
