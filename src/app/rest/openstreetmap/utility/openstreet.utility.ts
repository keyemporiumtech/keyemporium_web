import { HttpHeaders } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OpenstreetExtratagDTO } from '../dtos/openstreet-extratag.dto';
import { OpenstreetLocationDTO } from '../dtos/openstreet-location.dto';
import {
	OpenstreetRequest,
	OpenstreetRequestDetails,
	OpenstreetRequestLimit,
	OpenstreetRequestPolygon,
	OpenstreetRequestSearch,
} from '../interfaces/openstreet-request.interface';
import { OpenstreetmapService } from '../services/openstreetmap.service';

export class OpenstreetUtility {
	static manageRequestSearch(
		paramRequest?: OpenstreetRequest,
		paramSearch?: OpenstreetRequestSearch,
		paramDetails?: OpenstreetRequestDetails,
		paramLimit?: OpenstreetRequestLimit,
		paramPolygon?: OpenstreetRequestPolygon,
	): string {
		let req: string = '';
		if (paramRequest) {
			if (paramRequest.email) {
				req += '&email=' + paramRequest.email;
			}
			if (paramRequest.dedupe) {
				req += '&dedupe=1';
			}
			if (paramRequest.debug) {
				req += '&debug=1';
			}
		}
		if (paramSearch) {
			if (paramSearch.q) {
				req += '&q=' + paramSearch.q;
			}
			if (paramSearch.street) {
				req += '&street=' + paramSearch.street;
			}
			if (paramSearch.city) {
				req += '&city=' + paramSearch.city;
			}
			if (paramSearch.county) {
				req += '&county=' + paramSearch.county;
			}
			if (paramSearch.state) {
				req += '&state=' + paramSearch.state;
			}
			if (paramSearch.country) {
				req += '&country=' + paramSearch.country;
			}
			if (paramSearch.postalcode) {
				req += '&postalcode=' + paramSearch.postalcode;
			}
		}
		if (paramDetails) {
			if (paramDetails.addressdetails) {
				req += '&addressdetails=1';
			}
			if (paramDetails.extratags) {
				req += '&extratags=1';
			}
			if (paramDetails.namedetails) {
				req += '&namedetails=1';
			}
		}
		if (paramLimit) {
			if (paramLimit.countrycodes) {
				req += '&countrycodes=' + paramLimit.countrycodes;
			}
			if (paramLimit.exclude_place_ids) {
				req += '&exclude_place_ids=' + paramLimit.exclude_place_ids;
			}
			if (paramLimit.limit) {
				req += '&limit=' + paramLimit.limit;
			}
			if (paramLimit.viewbox) {
				req += '&viewbox=' + paramLimit.viewbox;
			}
			if (paramLimit.bounded) {
				req += '&bounded=1';
			}
			if (paramLimit.zoom) {
				req += '&zoom=' + paramLimit.zoom;
			}
		}
		if (paramPolygon) {
			if (paramPolygon.polygon_geojson) {
				req += '&polygon_geojson=1';
			}
			if (paramPolygon.polygon_kml) {
				req += '&polygon_kml=1';
			}
			if (paramPolygon.polygon_svg) {
				req += '&polygon_svg=1';
			}
			if (paramPolygon.polygon_text) {
				req += '&polygon_text=1';
			}
			if (paramPolygon.polygon_threshold) {
				req += '&polygon_threshold=' + paramPolygon.polygon_threshold;
			}
		}
		return req;
	}

	static manageRequestReverse(
		paramRequest?: OpenstreetRequest,
		paramDetails?: OpenstreetRequestDetails,
		paramLimit?: OpenstreetRequestLimit,
	): string {
		let req: string = '';
		if (paramRequest) {
			if (paramRequest.email) {
				req += '&email=' + paramRequest.email;
			}
			if (paramRequest.debug) {
				req += '&debug=1';
			}
		}
		if (paramDetails) {
			if (paramDetails.addressdetails) {
				req += '&addressdetails=1';
			}
			if (paramDetails.extratags) {
				req += '&extratags=1';
			}
			if (paramDetails.namedetails) {
				req += '&namedetails=1';
			}
		}
		if (paramLimit) {
			if (paramLimit.zoom) {
				req += '&zoom=' + paramLimit.zoom;
			}
		}
		return req;
	}

	static manageRequestHeader(paramRequest?: OpenstreetRequest): HttpHeaders {
		let req: HttpHeaders;
		if (paramRequest && paramRequest.acceptLanguage) {
			req = new HttpHeaders();
		}
		if (paramRequest) {
			if (paramRequest.acceptLanguage) {
				req.append('Accept-Language', paramRequest.acceptLanguage);
			}
		}

		return req;
	}

	static getOpenstreetLocations(
		openstreetService: OpenstreetmapService,
		$obsLocation: Observable<OpenstreetLocationDTO[]>,
		extratags?: boolean,
		language?: string,
	): Observable<OpenstreetLocationDTO[]> {
		if (extratags) {
			const $obsExtratags: Observable<OpenstreetExtratagDTO[]>[] = [];

			return $obsLocation.pipe(
				switchMap((locs) => {
					locs.forEach((loc) => {
						$obsExtratags.push(openstreetService.extratags(this.getExtratagsParam(loc), language));
					});
					return combineLatest($obsExtratags).pipe(
						map((data) => {
							data.forEach((tags, index) => {
								locs[index].tags = tags;
							});
							return locs;
						}),
					);
				}),
			);
		}
		return $obsLocation;
	}

	static getOpenstreetLocation(
		openstreetService: OpenstreetmapService,
		$obsLocation: Observable<OpenstreetLocationDTO>,
		extratags?: boolean,
		language?: string,
	): Observable<OpenstreetLocationDTO> {
		if (extratags) {
			return $obsLocation.pipe(
				switchMap((loc) => {
					if (loc && loc.extratags) {
						return openstreetService.extratags(this.getExtratagsParam(loc), language).pipe(
							map((tags) => {
								loc.tags = tags;
								return loc;
							}),
						);
					} else {
						return of(loc);
					}
				}),
			);
		}
		return $obsLocation;
	}

	static getExtratagsParam(obj: OpenstreetLocationDTO): string {
		const keyValues: string[] = [];
		if (obj && obj.extratags) {
			Object.keys(obj.extratags).forEach(function eachKey(key) {
				keyValues.push(key + '=' + obj.extratags[key]);
			});
		}
		return keyValues.length ? keyValues.join(',') : '';
	}
}
