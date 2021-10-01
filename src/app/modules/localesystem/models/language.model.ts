import { ApiModel } from '../../api/cakeutils/base/api.model';

export class LanguageModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _symbol: string;
	private _flgused: boolean;
	// added
	private _iconimage: string; // base64
	private _country: string;
	private _language: string;
	private _locale: string;
	private _currencycod: string;
	private _currencysymbol: string;

	// utils
	titleHtml(cssImg?: { cssClass; cssStyle }, cssText?: { cssClass; cssStyle }): string {
		const cssImgClass =
			cssImg && cssImg.cssClass ? cssImg.cssClass : 'img-fluid select-image-icon language-image';
		const cssImgStyle = cssImg && cssImg.cssStyle ? cssImg.cssStyle : '';
		const cssTextClass = cssText && cssText.cssClass ? cssText.cssClass : 'language-title';
		const cssTextStyle = cssText && cssText.cssStyle ? cssText.cssStyle : '';

		let content = this.iconimage
			? '<img class="' +
			  cssImgClass +
			  '" style="' +
			  cssImgStyle +
			  '" src="' +
			  this.iconimage +
			  '"/>'
			: '';
		content +=
			'<span class="' + cssTextClass + '" class="' + cssTextStyle + '">' + this.title + '</span>';
		return content;
	}

	imgHtml(cssImg?: { cssClass; cssStyle }): string {
		const cssImgClass =
			cssImg && cssImg.cssClass ? cssImg.cssClass : 'img-fluid select-image-icon language-image';
		const cssImgStyle = cssImg && cssImg.cssStyle ? cssImg.cssStyle : '';
		const content = this.iconimage
			? '<img class="' +
			  cssImgClass +
			  '" style="' +
			  cssImgStyle +
			  '" src="' +
			  this.iconimage +
			  '"/>'
			: '';
		return content;
	}

	textHtml(cssText?: { cssClass; cssStyle }): string {
		const cssTextClass = cssText && cssText.cssClass ? cssText.cssClass : 'language-title';
		const cssTextStyle = cssText && cssText.cssStyle ? cssText.cssStyle : '';

		const content =
			'<span class="' + cssTextClass + '" style="' + cssTextStyle + '">' + this.title + '</span>';
		return content;
	}

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter title
	 * @return {string}
	 */
	public get title(): string {
		return this._title;
	}

	/**
	 * Getter symbol
	 * @return {string}
	 */
	public get symbol(): string {
		return this._symbol;
	}

	/**
	 * Getter flgused
	 * @return {boolean}
	 */
	public get flgused(): boolean {
		return this._flgused;
	}

	/**
	 * Getter iconimage
	 * @return {string}
	 */
	public get iconimage(): string {
		return this._iconimage;
	}

	/**
	 * Getter country
	 * @return {string}
	 */
	public get country(): string {
		return this._country;
	}

	/**
	 * Getter language
	 * @return {string}
	 */
	public get language(): string {
		return this._language;
	}

	/**
	 * Getter locale
	 * @return {string}
	 */
	public get locale(): string {
		return this._locale;
	}

	/**
	 * Getter currencycod
	 * @return {string}
	 */
	public get currencycod(): string {
		return this._currencycod;
	}

	/**
	 * Getter currencysymbol
	 * @return {string}
	 */
	public get currencysymbol(): string {
		return this._currencysymbol;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter title
	 * @param {string} value
	 */
	public set title(value: string) {
		this._title = value;
	}

	/**
	 * Setter symbol
	 * @param {string} value
	 */
	public set symbol(value: string) {
		this._symbol = value;
	}

	/**
	 * Setter flgused
	 * @param {boolean} value
	 */
	public set flgused(value: boolean) {
		this._flgused = value;
	}

	/**
	 * Setter iconimage
	 * @param {string} value
	 */
	public set iconimage(value: string) {
		this._iconimage = value;
	}

	/**
	 * Setter country
	 * @param {string} value
	 */
	public set country(value: string) {
		this._country = value;
	}

	/**
	 * Setter language
	 * @param {string} value
	 */
	public set language(value: string) {
		this._language = value;
	}

	/**
	 * Setter locale
	 * @param {string} value
	 */
	public set locale(value: string) {
		this._locale = value;
	}

	/**
	 * Setter currencycod
	 * @param {string} value
	 */
	public set currencycod(value: string) {
		this._currencycod = value;
	}

	/**
	 * Setter currencysymbol
	 * @param {string} value
	 */
	public set currencysymbol(value: string) {
		this._currencysymbol = value;
	}
}
