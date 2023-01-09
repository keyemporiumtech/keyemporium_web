import { BaseComponent, ApplicationLoggerService } from '@ddc/kit';
import { OnChanges, Input, Directive } from '@angular/core';
import { MapIconInterface } from '../../openstreetmap/interfaces/map-icon.interface';
import { MapMarkerInterface } from '../../openstreetmap/interfaces/map-marker.interface';
import { Subscription, timer } from 'rxjs';
import { OpenstreetmapService } from '../../openstreetmap/services/openstreetmap.service';
import { OpenstreetLocationModel } from '../../openstreetmap/models/openstreet-location.model';
declare let L: any;

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseMapComponent extends BaseComponent implements OnChanges {
	@Input() latitude: number;
	@Input() longitude: number;
	@Input() zoom: number;
	@Input() height: string;
	@Input() layerUrl: string;
	@Input() layerOptions: any;
	@Input() iconMarker: MapIconInterface;
	@Input() textMarker: string;
	@Input() markers: MapMarkerInterface[];
	@Input() notScroll: boolean;
	// style
	@Input() classMap: any;
	@Input() styleMap: any;
	@Input() showEnableDisableScroll: boolean = true;
	// used
	map: any;
	markerCenter: any;
	options: any;
	mapMarkers: any[];
	// sub
	subTimer: Subscription;
	subAddressText: Subscription;
	// services
	openstreetService: OpenstreetmapService;

	constructor(
		applicationLogger: ApplicationLoggerService,
		openstreetService: OpenstreetmapService,
	) {
		super(applicationLogger);
		this.openstreetService = openstreetService;
		this.height = '180px';
		this.layerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		this.layerOptions = {
			attribution:
				'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			crossOrigin: true,
		};
		this.mapMarkers = [];
	}

	ngOnChanges() {
		if (this.id && this.latitude && this.longitude && !this.map) {
			this.startLoading();
			if (this.loading) {
				this.subTimer = timer(2000).subscribe((tick) => {
					this.stopLoading();
					if (!this.map) {
						this.initMap();
					}
				});
			}
		}
		if (this.textMarker && this.markerCenter) {
			this.markerCenter.bindPopup(this.textMarker);
			this.markerCenter.openPopup();
		}
		if (this.latitude && this.longitude && this.markerCenter && this.map) {
			this.markerCenter.setLatLng([this.latitude, this.longitude]);
			if (this.textMarker) {
				this.markerCenter.openPopup();
			}
			this.map.setView([this.latitude, this.longitude], this.zoom ? this.zoom : 13);
		}
	}

	initMap() {
		this.options = {
			center: [this.latitude, this.longitude],
			zoom: this.zoom ? this.zoom : 13,
		};
		if (this.notScroll) {
			this.options.scrollWheelZoom = false;
		}
		this.map = L.map(this.id, this.options);

		L.tileLayer(this.layerUrl, this.layerOptions).addTo(this.map);
		this.markerCenter = this.getMarker(
			this.latitude,
			this.longitude,
			this.textMarker,
			this.iconMarker,
		);
		this.markerCenter.addTo(this.map);
		if (this.textMarker) {
			this.markerCenter.openPopup();
		}

		if (this.markers && this.markers.length) {
			this.markers.forEach((marker) => {
				this.addMarker(marker.latitude, marker.longitude, marker.text, marker.icon);
			});
		}
	}
	ngOnInitForChildren() {
		window.addEventListener('animationstart', this.updateMap);
		window.addEventListener('animationiteration', this.updateMap);
		window.addEventListener('animationend', this.updateMap);
	}
	updateMap = () => {
		setTimeout(() => {
			if (this.map) {
				this.map.invalidateSize();
			}
		}, 3000);
	};
	onMapReady(map: any) {
		setTimeout(() => {
			map.invalidateSize();
		}, 0);
	}

	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {
		if (this.subTimer) {
			this.subTimer.unsubscribe();
		}
		if (this.subAddressText) {
			this.subAddressText.unsubscribe();
		}
	}
	getClassName(): string {
		return 'MapComponent';
	}

	addMarker(lat: number, lon: number, text?: string, icon?: MapIconInterface, open?: boolean) {
		const marker = this.getMarker(lat, lon, text, icon);
		marker.addTo(this.map);
		this.mapMarkers.push(marker);
		if (open && (text || (icon && icon.text))) {
			marker.openPopup();
		}
	}

	addMarkerWithAddress(lat: number, lon: number, icon?: MapIconInterface, open?: boolean) {
		this.subAddressText = this.openstreetService
			.reverseOpenstreetLocationUnique(lat, lon)
			.subscribe((res) => {
				if (res) {
					const text: string = this.getTextByLocation(res);
					this.addMarker(lat, lon, text, icon, open);
				}
			});
	}

	getMarker(lat: number, lon: number, text?: string, icon?: MapIconInterface) {
		const marker = L.marker([lat, lon]);
		if (icon) {
			marker.setIcon(this.getIcon(icon));
		}
		if (icon && icon.text) {
			marker.bindPopup(icon.text);
		} else if (text) {
			marker.bindPopup(text);
		}
		return marker;
	}

	getIcon(icon: MapIconInterface) {
		const iconRes = L.icon({
			iconUrl: icon.url,
			// iconRetinaUrl: 'my-icon@2x.png',
			iconSize: icon.size,
			iconAnchor: icon.anchor,
			popupAnchor: icon.popupAnchor,
			shadowUrl: icon.urlShadow,
			shadowRetinaUrl: icon.urlShadow,
			shadowSize: icon.sizeShadow,
			shadowAnchor: icon.anchorShadow,
		});
		return iconRes;
	}

	enableScroll() {
		this.notScroll = false;
		this.map.scrollWheelZoom.enable();
	}
	disableScroll() {
		this.notScroll = true;
		this.map.scrollWheelZoom.disable();
	}

	move(latitude: number, longitude: number) {
		this.map.setView([latitude, longitude], this.zoom ? this.zoom : 13);
	}

	abstract getTextByLocation(locationAddress: OpenstreetLocationModel): string;
}
