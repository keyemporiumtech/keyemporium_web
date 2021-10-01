import { Component, OnInit, OnDestroy } from '@angular/core';
import { OpenstreetmapService } from '@ddc/rest';
import { Subscription } from 'rxjs';

@Component({
	selector: 'wiki-test-rest-openstreetmap',
	templateUrl: './test-rest-openstreetmap.component.html',
	styleUrls: ['./test-rest-openstreetmap.component.scss'],
})
export class TestRestOpenstreetmapComponent implements OnInit, OnDestroy {
	search: string = '';
	latitude: number;
	longitude: number;
	output: any;
	subQuery: Subscription;
	constructor(private openstreetService: OpenstreetmapService) {}

	ngOnInit() {}

	ngOnDestroy() {
		if (this.subQuery) {
			this.subQuery.unsubscribe();
		}
	}

	list(extratags?: boolean) {
		this.subQuery = this.openstreetService
			.searchOpenstreetLocationList(this.search, 5, undefined, extratags)
			.subscribe((res) => {
				this.output = res;
			});
	}

	unique(extratags?: boolean) {
		this.subQuery = this.openstreetService
			.searchOpenstreetLocationUnique(this.search, extratags)
			.subscribe((res) => {
				this.output = res;
			});
	}

	reverse(extratags?: boolean) {
		this.subQuery = this.openstreetService
			.reverseOpenstreetLocationUnique(this.latitude, this.longitude, extratags)
			.subscribe((res) => {
				this.output = res;
			});
	}
}
