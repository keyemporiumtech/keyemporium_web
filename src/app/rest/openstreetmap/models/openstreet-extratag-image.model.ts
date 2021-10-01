import { BaseModel } from '@ddc/kit';

export class OpenstreetExtratagImageModel extends BaseModel {
	private _name: string;
	private _width: number;
	private _height: number;
	private _mime: string;
	private _url: string;
	private _url_prefix: string;
	private _url_suffix: string;

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter width
	 * @return {number}
	 */
	public get width(): number {
		return this._width;
	}

	/**
	 * Getter height
	 * @return {number}
	 */
	public get height(): number {
		return this._height;
	}

	/**
	 * Getter mime
	 * @return {string}
	 */
	public get mime(): string {
		return this._mime;
	}

	/**
	 * Getter url
	 * @return {string}
	 */
	public get url(): string {
		return this._url;
	}

	/**
	 * Getter url_prefix
	 * @return {string}
	 */
	public get url_prefix(): string {
		return this._url_prefix;
	}

	/**
	 * Getter url_suffix
	 * @return {string}
	 */
	public get url_suffix(): string {
		return this._url_suffix;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter width
	 * @param {number} value
	 */
	public set width(value: number) {
		this._width = value;
	}

	/**
	 * Setter height
	 * @param {number} value
	 */
	public set height(value: number) {
		this._height = value;
	}

	/**
	 * Setter mime
	 * @param {string} value
	 */
	public set mime(value: string) {
		this._mime = value;
	}

	/**
	 * Setter url
	 * @param {string} value
	 */
	public set url(value: string) {
		this._url = value;
	}

	/**
	 * Setter url_prefix
	 * @param {string} value
	 */
	public set url_prefix(value: string) {
		this._url_prefix = value;
	}

	/**
	 * Setter url_suffix
	 * @param {string} value
	 */
	public set url_suffix(value: string) {
		this._url_suffix = value;
	}
}
