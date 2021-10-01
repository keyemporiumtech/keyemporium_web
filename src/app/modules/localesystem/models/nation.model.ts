import { ApiModel } from '../../api/cakeutils/base/api.model';

export class NationModel extends ApiModel {
	private _cod: string;
	private _name: string;
	private _description: string;
	private _capital: string;
	private _continent: string;
	private _currencycod: string;
	private _tld: string;
	private _type: string;
	private _cod_iso3166: string;
	private _geo1: string;
	private _geo2: string;
	private _tel: string;
	private _flgiban: boolean;
	private _flgused: boolean;
	private _priority: number;
	private _symbol: string;
	// added
	private _iconimage: string; // base64

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
			'<span class="' + cssTextClass + '" style="' + cssTextStyle + '">' + this.name + '</span>';
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
			'<span class="' + cssTextClass + '" style="' + cssTextStyle + '">' + this.name + '</span>';
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
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter capital
	 * @return {string}
	 */
	public get capital(): string {
		return this._capital;
	}

	/**
	 * Getter continent
	 * @return {string}
	 */
	public get continent(): string {
		return this._continent;
	}

	/**
	 * Getter currencycod
	 * @return {string}
	 */
	public get currencycod(): string {
		return this._currencycod;
	}

	/**
	 * Getter tld
	 * @return {string}
	 */
	public get tld(): string {
		return this._tld;
	}

	/**
	 * Getter type
	 * @return {string}
	 */
	public get type(): string {
		return this._type;
	}

	/**
	 * Getter cod_iso3166
	 * @return {string}
	 */
	public get cod_iso3166(): string {
		return this._cod_iso3166;
	}

	/**
	 * Getter geo1
	 * @return {string}
	 */
	public get geo1(): string {
		return this._geo1;
	}

	/**
	 * Getter geo2
	 * @return {string}
	 */
	public get geo2(): string {
		return this._geo2;
	}

	/**
	 * Getter tel
	 * @return {string}
	 */
	public get tel(): string {
		return this._tel;
	}

	/**
	 * Getter flgiban
	 * @return {boolean}
	 */
	public get flgiban(): boolean {
		return this._flgiban;
	}

	/**
	 * Getter flgused
	 * @return {boolean}
	 */
	public get flgused(): boolean {
		return this._flgused;
	}

	/**
	 * Getter priority
	 * @return {number}
	 */
	public get priority(): number {
		return this._priority;
	}

	/**
	 * Getter symbol
	 * @return {string}
	 */
	public get symbol(): string {
		return this._symbol;
	}

	/**
	 * Getter iconimage
	 * @return {string}
	 */
	public get iconimage(): string {
		return this._iconimage;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter capital
	 * @param {string} value
	 */
	public set capital(value: string) {
		this._capital = value;
	}

	/**
	 * Setter continent
	 * @param {string} value
	 */
	public set continent(value: string) {
		this._continent = value;
	}

	/**
	 * Setter currencycod
	 * @param {string} value
	 */
	public set currencycod(value: string) {
		this._currencycod = value;
	}

	/**
	 * Setter tld
	 * @param {string} value
	 */
	public set tld(value: string) {
		this._tld = value;
	}

	/**
	 * Setter type
	 * @param {string} value
	 */
	public set type(value: string) {
		this._type = value;
	}

	/**
	 * Setter cod_iso3166
	 * @param {string} value
	 */
	public set cod_iso3166(value: string) {
		this._cod_iso3166 = value;
	}

	/**
	 * Setter geo1
	 * @param {string} value
	 */
	public set geo1(value: string) {
		this._geo1 = value;
	}

	/**
	 * Setter geo2
	 * @param {string} value
	 */
	public set geo2(value: string) {
		this._geo2 = value;
	}

	/**
	 * Setter tel
	 * @param {string} value
	 */
	public set tel(value: string) {
		this._tel = value;
	}

	/**
	 * Setter flgiban
	 * @param {boolean} value
	 */
	public set flgiban(value: boolean) {
		this._flgiban = value;
	}

	/**
	 * Setter flgused
	 * @param {boolean} value
	 */
	public set flgused(value: boolean) {
		this._flgused = value;
	}

	/**
	 * Setter priority
	 * @param {number} value
	 */
	public set priority(value: number) {
		this._priority = value;
	}

	/**
	 * Setter symbol
	 * @param {string} value
	 */
	public set symbol(value: string) {
		this._symbol = value;
	}

	/**
	 * Setter iconimage
	 * @param {string} value
	 */
	public set iconimage(value: string) {
		this._iconimage = value;
	}
}
