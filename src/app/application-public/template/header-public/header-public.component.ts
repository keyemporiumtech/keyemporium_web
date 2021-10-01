import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
@Component({
	selector: 'public-header-public',
	templateUrl: './header-public.component.html',
	styleUrls: ['./header-public.component.scss'],
})
export class HeaderPublicComponent implements OnInit {
	appTitle: string;
	router: Router;
	constructor(router: Router) {
		this.appTitle = environment.appName;
		this.router = router;
	}

	ngOnInit() {}

	home() {
		this.router.navigate(environment.url.home);
	}
}
