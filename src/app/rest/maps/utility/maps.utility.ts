/**
 * https://developers.google.com/maps/documentation/embed/get-started
 */
export class MapsUtility {
	static buildIFrameHTML(
		address: string,
		width: number,
		height: number,
		zoom: number,
		language?: string,
	): string {
		if (!language) {
			language = 'en';
		}
		const q = '';
		const src =
			'https://maps.google.com/maps?width=' +
			width +
			'&amp;height=' +
			height +
			'&amp;hl=' +
			language +
			'&amp;q=' +
			address +
			'&amp;ie=UTF8&amp;t=&amp;z=' +
			zoom +
			'&amp;iwloc=B&amp;output=embed';
		const iframe: string =
			'<iframe width="' +
			width +
			'" height="' +
			height +
			'" src="' +
			src +
			'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';
		return iframe;
	}
}
