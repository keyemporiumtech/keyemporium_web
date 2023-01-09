import { ApiModel } from '../../api/cakeutils/base/api.model';
import { UserModel } from '../../authentication/models/user.model';
import { ActivityModel } from '../../authentication/models/activity.model';

export class BasketModel extends ApiModel {
	private _cod: string;
	private _website: string;
	private _title: string;
	private _flgclosed: boolean;
	private _flgreserve: boolean;
	private _user: UserModel;
	private _activity: ActivityModel;
	private _email: string;
	private _phone: string;
	private _emailto: string;
	private _phoneto: string;
	private _strto: string;
	private _note: string;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter website
	 * @return {string}
	 */
	public get website(): string {
		return this._website;
	}

	/**
	 * Getter title
	 * @return {string}
	 */
	public get title(): string {
		return this._title;
	}

	/**
	 * Getter flgclosed
	 * @return {boolean}
	 */
	public get flgclosed(): boolean {
		return this._flgclosed;
	}

	/**
	 * Getter flgreserve
	 * @return {boolean}
	 */
	public get flgreserve(): boolean {
		return this._flgreserve;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
	}

	/**
	 * Getter activity
	 * @return {ActivityModel}
	 */
	public get activity(): ActivityModel {
		return this._activity;
	}

	/**
	 * Getter email
	 * @return {string}
	 */
	public get email(): string {
		return this._email;
	}

	/**
	 * Getter phone
	 * @return {string}
	 */
	public get phone(): string {
		return this._phone;
	}

	/**
	 * Getter emailto
	 * @return {string}
	 */
	public get emailto(): string {
		return this._emailto;
	}

	/**
	 * Getter phoneto
	 * @return {string}
	 */
	public get phoneto(): string {
		return this._phoneto;
	}

	/**
	 * Getter strto
	 * @return {string}
	 */
	public get strto(): string {
		return this._strto;
	}

	/**
	 * Getter note
	 * @return {string}
	 */
	public get note(): string {
		return this._note;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter website
	 * @param {string} value
	 */
	public set website(value: string) {
		this._website = value;
	}

	/**
	 * Setter title
	 * @param {string} value
	 */
	public set title(value: string) {
		this._title = value;
	}

	/**
	 * Setter flgclosed
	 * @param {boolean} value
	 */
	public set flgclosed(value: boolean) {
		this._flgclosed = value;
	}

	/**
	 * Setter flgreserve
	 * @param {boolean} value
	 */
	public set flgreserve(value: boolean) {
		this._flgreserve = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter activity
	 * @param {ActivityModel} value
	 */
	public set activity(value: ActivityModel) {
		this._activity = value;
	}

	/**
	 * Setter email
	 * @param {string} value
	 */
	public set email(value: string) {
		this._email = value;
	}

	/**
	 * Setter phone
	 * @param {string} value
	 */
	public set phone(value: string) {
		this._phone = value;
	}

	/**
	 * Setter emailto
	 * @param {string} value
	 */
	public set emailto(value: string) {
		this._emailto = value;
	}

	/**
	 * Setter phoneto
	 * @param {string} value
	 */
	public set phoneto(value: string) {
		this._phoneto = value;
	}

	/**
	 * Setter strto
	 * @param {string} value
	 */
	public set strto(value: string) {
		this._strto = value;
	}

	/**
	 * Setter note
	 * @param {string} value
	 */
	public set note(value: string) {
		this._note = value;
	}
}
