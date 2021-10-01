import { MapIconInterface } from './map-icon.interface';

export interface MapMarkerInterface {
	latitude: number;
	longitude: number;
	text?: string;
	icon?: MapIconInterface;
}
