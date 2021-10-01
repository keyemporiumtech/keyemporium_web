export interface EsriInterface {
	spatialReference: EsriSpatialReferenceInterface;
	locations: EsriLocationInterface[];
}

export interface EsriSpatialReferenceInterface {
	wkid: any;
	latestWkid: any;
}

export interface EsriLocationInterface {
	name: string;
	extent: EsriLocationExtentInterface;
	feature: EsriLocationFeatureInterface;
}

export interface EsriLocationExtentInterface {
	xmin: number;
	ymin: number;
	xmax: number;
	ymax: number;
}

export interface EsriLocationFeatureInterface {
	geometry: EsriLocationGeometryInterface;
	attributes: EsriLocationAttributeInterface;
}

export interface EsriLocationGeometryInterface {
	x: number;
	y: number;
}

export interface EsriLocationAttributeInterface {
	Score: number;
	Addr_Type: string;
}
