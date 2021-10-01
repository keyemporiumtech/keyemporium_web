import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'ddc-init-app-loading',
	templateUrl: './app-loading.component.html',
	styleUrls: ['./app-loading.component.scss'],
})
export class AppLoadingComponent implements OnInit {
	@Input() loading: boolean;
	color: string;
	type: string;
	constructor() {
		this.color = environment.loading.color;
		this.type = environment.loading.type;
	}

	ngOnInit() {}
}
