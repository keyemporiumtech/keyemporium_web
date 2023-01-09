import { Component, OnInit, Input } from '@angular/core';
import { MapsUtility } from '@ddc/rest';

@Component({
	selector: 'ddc-init-gmap',
	templateUrl: './gmap.component.html',
	styleUrls: ['./gmap.component.scss'],
})
export class GmapComponent implements OnInit {
	@Input() address: string;
	@Input() width: number;
	@Input() height: number;
	@Input() zoom: number;
	@Input() language: string;
	html: string;
	constructor() {}

	ngOnInit() {
		this.html = MapsUtility.buildIFrameHTML(
			this.address,
			this.width,
			this.height,
			this.zoom,
			this.language,
		);
	}
}
