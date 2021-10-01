export interface OpenstreetRequest {
	acceptLanguage?: string;
	email?: string;
	dedupe?: boolean;
	debug?: boolean;
}

export interface OpenstreetRequestSearch {
	q?: string;
	street?: string;
	city?: string;
	county?: string;
	state?: string;
	country?: string;
	postalcode?: string;
}

/**
 * zoom	address detail
    3	country
    5	state
    8	county
    10	city
    14	suburb
    16	major streets
    17	major and minor streets
    18	building
 */
export interface OpenstreetRequestLimit {
	countrycodes?: string; // it,en
	exclude_place_ids?: string; // 1,2
	limit?: number;
	viewbox?: string; // x1, y1, x2, y2
	bounded?: boolean;
	zoom?: number; // [0,18]
}

export interface OpenstreetRequestDetails {
	addressdetails?: boolean;
	extratags?: boolean;
	namedetails?: string;
}

export interface OpenstreetRequestPolygon {
	polygon_geojson?: boolean;
	polygon_kml?: boolean;
	polygon_svg?: boolean;
	polygon_text?: boolean;
	polygon_threshold?: number; // 0.0
}
