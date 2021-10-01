export class GeoUtility {
	static getLocation(fn: (position) => any, error: () => any) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(fn);
		} else {
			error();
		}
	}
}
