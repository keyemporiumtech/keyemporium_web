import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageUtility } from '@ddc/kit';

@Component({
	selector: 'wiki-test-kit-routing',
	templateUrl: './test-kit-routing.component.html',
	styleUrls: ['./test-kit-routing.component.scss'],
})
export class TestKitRoutingComponent implements OnInit {
	current: string;
	cleanUrlCurrent: any;
	splitUrlCurrent: any;
	splitUrlNavigationExtrasQueryParametersCurrent: any;
	url1: string = 'http://localhost:4200/#/wiki/test-kit';
	cleanUrl1: any;
	splitUrl1: any;
	splitUrlNavigationExtrasQueryParameters1: any;

	url2: string = 'http://localhost:4200/#/wiki/test-kit?prova1=ciao&prova2=ciao2';
	cleanUrl2: any;
	splitUrl2: any;
	splitUrlNavigationExtrasQueryParameters2: any;

	url3: string =
		// tslint:disable-next-line:max-line-length
		'https://www.google.com/search?q=js+exclude+elements+from+array&rlz=1C1GCEV_enIT838IT838&oq=js+exclude+elements&aqs=chrome.1.69i57j0i22i30l9.5144j0j7&sourceid=chrome&ie=UTF-8';

	cleanUrl3: any;
	splitUrl3: any;
	splitUrlNavigationExtrasQueryParameters3: any;

	constructor(private router: Router) {
		this.current = this.router.url;
	}

	ngOnInit() {}

	cleanUrl(url: string) {
		return PageUtility.cleanUrl(url);
	}
	splitUrl(url: string) {
		return PageUtility.splitUrl(url);
	}
	splitUrlNavigationExtrasQueryParameters(url: string) {
		return PageUtility.splitUrlNavigationExtrasQueryParameters(url);
	}
}
