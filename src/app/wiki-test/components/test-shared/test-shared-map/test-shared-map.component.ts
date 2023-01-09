import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../../../../shared/components/map/map.component';
import { MapIconInterface } from '@ddc/rest';

@Component({
	selector: 'wiki-test-shared-map',
	templateUrl: './test-shared-map.component.html',
	styleUrls: ['./test-shared-map.component.scss'],
})
export class TestSharedMapComponent implements OnInit {
	icon: MapIconInterface;
	constructor() {
		this.icon = {
			url: 'assets/images/icon-map.png',
			popupAnchor: [0, 0],
		};
	}

	ngOnInit() {}

	addMarkerRome(
		child: MapComponent,
		icon?: MapIconInterface,
		open?: boolean,
		textAutomatic?: boolean,
	) {
		const lat = 41.909986;
		const lon = 12.3959125;
		const rnLat = +Math.random().toString().substring(0, 8);
		const rnLon = +Math.random().toString().substring(0, 8);

		if (textAutomatic) {
			child.addMarkerWithAddress(rnLat + lat, rnLon + lon, icon, open);
		} else {
			child.addMarker(rnLat + lat, rnLon + lon, '<b>Marker aggiuntivo</b>', icon, open);
		}
		child.move(rnLat + lat, rnLon + lon);
	}
}
