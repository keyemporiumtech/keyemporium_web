import { DateUtility } from '../../timing/utility/date.utility';
import { StringTranslate } from '../../translation/models/string-translate.model';

export class AudioFileModel {
	private _path: string;
	private _title: string | StringTranslate;
	private _description: string | StringTranslate;
	private _duration: number;
	private _author: string;

	constructor(
		path: string,
		title: string | StringTranslate,
		author?: string,
		description?: string | StringTranslate,
		duration?: number,
	) {
		this.path = path;
		this.title = title;
		this.author = author;
		this.description = description;
		this.duration = duration;
	}

	get durationText() {
		if (!this.duration) {
			return '---';
		}
		if (this.duration > 3600) {
			return DateUtility.toHHMMSS(this.duration);
		}
		return DateUtility.toMMSS(this.duration);
	}

	/**
	 * Getter path
	 * @return {string}
	 */
	public get path(): string {
		return this._path;
	}

	/**
	 * Getter title
	 * @return {string | StringTranslate}
	 */
	public get title(): string | StringTranslate {
		return this._title;
	}

	/**
	 * Getter description
	 * @return {string| StringTranslate }
	 */
	public get description(): string | StringTranslate {
		return this._description;
	}

	/**
	 * Getter duration
	 * @return {number}
	 */
	public get duration(): number {
		return this._duration;
	}

	/**
	 * Getter author
	 * @return {string}
	 */
	public get author(): string {
		return this._author;
	}

	/**
	 * Setter path
	 * @param {string} value
	 */
	public set path(value: string) {
		this._path = value;
	}

	/**
	 * Setter title
	 * @param {string | StringTranslate} value
	 */
	public set title(value: string | StringTranslate) {
		this._title = value;
	}

	/**
	 * Setter description
	 * @param {string | StringTranslate} value
	 */
	public set description(value: string | StringTranslate) {
		this._description = value;
	}

	/**
	 * Setter duration
	 * @param {number} value
	 */
	public set duration(value: number) {
		this._duration = value;
	}

	/**
	 * Setter author
	 * @param {string} value
	 */
	public set author(value: string) {
		this._author = value;
	}
}
