import { ApiModel } from '../../api/cakeutils/base/api.model';
import { LanguageModel } from './language.model';

export class MultilanguageModel extends ApiModel {
	private _tablename: string;
	private _fieldname: string;
	private _content: string;
	private _objraw: string;
	private _language: LanguageModel;
	private _languagecod: string;
	private _type: string;

	/**
	 * Getter tablename
	 * @return {string}
	 */
	public get tablename(): string {
		return this._tablename;
	}

	/**
	 * Getter fieldname
	 * @return {string}
	 */
	public get fieldname(): string {
		return this._fieldname;
	}

	/**
	 * Getter content
	 * @return {string}
	 */
	public get content(): string {
		return this._content;
	}

	/**
	 * Getter objraw
	 * @return {string}
	 */
	public get objraw(): string {
		return this._objraw;
	}

	/**
	 * Getter language
	 * @return {LanguageModel}
	 */
	public get language(): LanguageModel {
		return this._language;
	}

	/**
	 * Getter languagecod
	 * @return {string}
	 */
	public get languagecod(): string {
		return this._languagecod;
	}

	/**
	 * Getter type
	 * @return {string}
	 */
	public get type(): string {
		return this._type;
	}

	/**
	 * Setter tablename
	 * @param {string} value
	 */
	public set tablename(value: string) {
		this._tablename = value;
	}

	/**
	 * Setter fieldname
	 * @param {string} value
	 */
	public set fieldname(value: string) {
		this._fieldname = value;
	}

	/**
	 * Setter content
	 * @param {string} value
	 */
	public set content(value: string) {
		this._content = value;
	}

	/**
	 * Setter objraw
	 * @param {string} value
	 */
	public set objraw(value: string) {
		this._objraw = value;
	}

	/**
	 * Setter language
	 * @param {LanguageModel} value
	 */
	public set language(value: LanguageModel) {
		this._language = value;
	}

	/**
	 * Setter languagecod
	 * @param {string} value
	 */
	public set languagecod(value: string) {
		this._languagecod = value;
	}

	/**
	 * Setter type
	 * @param {string} value
	 */
	public set type(value: string) {
		this._type = value;
	}
}
