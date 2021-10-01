import { BaseService, ApplicationLoggerService } from '@ddc/kit';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { OpenstreetLocationModel } from '../models/openstreet-location.model';
import { OpenstreetLocationConverter } from '../converters/openstreet-location.converter';
import { OpenstreetLocationDTO } from '../dtos/openstreet-location.dto';
import {
	OpenstreetRequest,
	OpenstreetRequestSearch,
	OpenstreetRequestDetails,
	OpenstreetRequestLimit,
	OpenstreetRequestPolygon,
} from '../interfaces/openstreet-request.interface';
import { OpenstreetUtility } from '../utility/openstreet.utility';
import { OpenstreetExtratagDTO } from '../dtos/openstreet-extratag.dto';
import { OpenstreetExtratagImageDTO } from '../dtos/openstreet-extratag-image.dto';
import { OpenstreetmapModule } from '../openstreetmap.module';

@Injectable({
	providedIn: 'root',
})
export class OpenstreetmapService extends BaseService {
	private locationConverter: OpenstreetLocationConverter = new OpenstreetLocationConverter();
	constructor(applicationLogger: ApplicationLoggerService, private http: HttpClient) {
		super(applicationLogger);
	}

	getClassName(): string {
		return 'OpenstreetmapService';
	}

	// SEARCH
	searchOpenstreetLocationList(
		term: string,
		limit: number,
		excludeids?: string[],
		extratags?: boolean,
		language?: string,
	): Observable<OpenstreetLocationModel[]> {
		let url =
			'https://nominatim.openstreetmap.org/search?format=json&limit=' + limit + '&q=' + term;
		if (excludeids) {
			url += '&exclude_place_ids=' + excludeids.join(',');
		}
		if (extratags) {
			url += '&extratags=1';
		}

		let $obsLocation: Observable<OpenstreetLocationDTO[]>;
		const headers = OpenstreetUtility.manageRequestHeader({ acceptLanguage: language });
		if (headers) {
			$obsLocation = this.http.get<OpenstreetLocationDTO[]>(url, { headers: headers });
		} else {
			$obsLocation = this.http.get<OpenstreetLocationDTO[]>(url);
		}

		return OpenstreetUtility.getOpenstreetLocations(this, $obsLocation, extratags, language).pipe(
			map((res) => {
				if (res && res.length) {
					return this.locationConverter.convertToModelList(res);
				}
				return undefined;
			}),
		);
	}

	searchOpenstreetLocationUnique(
		term: string,
		extratags?: boolean,
		language?: string,
	): Observable<OpenstreetLocationModel> {
		return this.searchOpenstreetLocationList(term, 3, undefined, extratags, language).pipe(
			map((res) => res[0]),
		);
	}

	searchOpenstreetLocations(
		paramRequest?: OpenstreetRequest,
		paramSearch?: OpenstreetRequestSearch,
		paramDetails?: OpenstreetRequestDetails,
		paramLimit?: OpenstreetRequestLimit,
		paramPolygon?: OpenstreetRequestPolygon,
	): Observable<OpenstreetLocationModel[]> {
		const url =
			'https://nominatim.openstreetmap.org/search?format=json' +
			OpenstreetUtility.manageRequestSearch(
				paramRequest,
				paramSearch,
				paramDetails,
				paramLimit,
				paramPolygon,
			);

		let $obsLocation: Observable<OpenstreetLocationDTO[]>;
		const headers = OpenstreetUtility.manageRequestHeader(paramRequest);
		if (headers) {
			$obsLocation = this.http.get<OpenstreetLocationDTO[]>(url, { headers: headers });
		} else {
			$obsLocation = this.http.get<OpenstreetLocationDTO[]>(url);
		}

		return OpenstreetUtility.getOpenstreetLocations(
			this,
			$obsLocation,
			paramDetails.extratags,
			paramRequest.acceptLanguage,
		).pipe(
			map((res) => {
				if (res && res.length) {
					return this.locationConverter.convertToModelList(res);
				}
				return undefined;
			}),
		);
	}

	// REVERSE
	reverseOpenstreetLocationUnique(
		latitude: number,
		longitude: number,
		extratags?: boolean,
		language?: string,
	): Observable<OpenstreetLocationModel> {
		let url =
			'https://nominatim.openstreetmap.org/reverse?format=json&lat=' +
			latitude +
			'&lon=' +
			longitude;
		if (extratags) {
			url += '&extratags=1';
		}

		let $obsLocation: Observable<OpenstreetLocationDTO>;
		const headers = OpenstreetUtility.manageRequestHeader({ acceptLanguage: language });
		if (headers) {
			$obsLocation = this.http.get<OpenstreetLocationDTO>(url, { headers: headers });
		} else {
			$obsLocation = this.http.get<OpenstreetLocationDTO>(url);
		}

		return OpenstreetUtility.getOpenstreetLocation(this, $obsLocation, extratags, language).pipe(
			map((res) => {
				if (res) {
					return this.locationConverter.convertToModel(res);
				}
				return undefined;
			}),
		);
	}

	reverseOpenstreetLocation(
		latitude: number,
		longitude: number,
		paramRequest?: OpenstreetRequest,
		paramDetails?: OpenstreetRequestDetails,
		paramLimit?: OpenstreetRequestLimit,
	): Observable<OpenstreetLocationModel> {
		const url =
			'https://nominatim.openstreetmap.org/reverse?format=json&lat=' +
			latitude +
			'&lon=' +
			longitude +
			OpenstreetUtility.manageRequestReverse(paramRequest, paramDetails, paramLimit);

		let $obsLocation: Observable<OpenstreetLocationDTO>;
		const headers = OpenstreetUtility.manageRequestHeader(paramRequest);
		if (headers) {
			$obsLocation = this.http.get<OpenstreetLocationDTO>(url, { headers: headers });
		} else {
			$obsLocation = this.http.get<OpenstreetLocationDTO>(url);
		}

		return OpenstreetUtility.getOpenstreetLocation(
			this,
			$obsLocation,
			paramDetails.extratags,
			paramRequest.acceptLanguage,
		).pipe(
			map((res) => {
				if (res) {
					return this.locationConverter.convertToModel(res);
				}
				return undefined;
			}),
		);
	}

	// EXTRATAGS
	extratags(tags: string, language?: string): Observable<OpenstreetExtratagDTO[]> {
		const url = 'https://taginfo.openstreetmap.org/api/4/tags/list?tags=' + tags;
		return this.http.get<any>(url).pipe(
			map((extratag) => {
				const tagsList: OpenstreetExtratagDTO[] = [];
				if (extratag && (extratag.data as any[]) && extratag.data.length) {
					extratag.data.forEach((element) => {
						const tag: OpenstreetExtratagDTO = { id: undefined };
						tag.key = element.key;
						tag.value = element.value;
						if (element.wiki) {
							const keyWiki: string = language ? language : 'en';
							const wiki: any = element.wiki[keyWiki] ? element.wiki[keyWiki] : element.wiki['en'];
							tag.description = wiki ? wiki.description : '';
							if (wiki && wiki.image) {
								const image: OpenstreetExtratagImageDTO = { id: undefined };
								const wikiImage: any = wiki.image;
								image.name = wikiImage.image;
								image.width = wikiImage.width;
								image.height = wikiImage.height;
								image.mime = wikiImage.mime;
								image.url = wikiImage.image_url;
								image.url_prefix = wikiImage.thumb_url_prefix;
								image.url_suffix = wikiImage.thumb_url_suffix;
								tag.image = image;
							}
						}
						tagsList.push(tag);
					});
				}
				return tagsList;
			}),
		);
	}
}
