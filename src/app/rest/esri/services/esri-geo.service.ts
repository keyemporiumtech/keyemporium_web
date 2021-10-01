import { BaseService, ApplicationLoggerService } from '@ddc/kit';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EsriInterface, EsriLocationInterface } from '../interfaces/esri.interface';

@Injectable({
	providedIn: 'root',
})
export class EsriGeoService extends BaseService {
	constructor(applicationLogger: ApplicationLoggerService, private http: HttpClient) {
		super(applicationLogger);
	}

	getClassName(): string {
		return 'EsriGeoService';
	}

	// ESRI
	searchEsriLocation(term: string): Observable<EsriLocationInterface[]> {
		const url =
			'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?f=json&text=' +
			term;
		return this.http.get<EsriInterface>(url).pipe(
			map((res) => {
				if (res && res.locations && res.locations.length) {
					return res.locations;
				}
				return undefined;
			}),
		);
	}

	searchEsriLocationUnique(term: string): Observable<EsriLocationInterface> {
		const url =
			'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?f=json&text=' +
			term;
		return this.http.get<EsriInterface>(url).pipe(
			map((res) => {
				if (res && res.locations && res.locations.length) {
					return res.locations[0] as EsriLocationInterface;
				}
				return undefined;
			}),
		);
	}
}
