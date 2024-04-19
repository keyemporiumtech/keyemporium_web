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
	// calculated
	private _price: number;
	private _iva: number;
	private _discount: number;
	private _tax: number;
	private _totalsum: number;

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

	/**
	 * Getter price
	 * @return {number}
	 */
	public get price(): number {
		return this._price;
	}

	/**
	 * Getter iva
	 * @return {number}
	 */
	public get iva(): number {
		return this._iva;
	}

	/**
	 * Getter discount
	 * @return {number}
	 */
	public get discount(): number {
		return this._discount;
	}

	/**
	 * Getter tax
	 * @return {number}
	 */
	public get tax(): number {
		return this._tax;
	}

	/**
	 * Getter totalsum
	 * @return {number}
	 */
	public get totalsum(): number {
		return this._totalsum;
	}

	/**
	 * Setter price
	 * @param {number} value
	 */
	public set price(value: number) {
		this._price = value;
	}

	/**
	 * Setter iva
	 * @param {number} value
	 */
	public set iva(value: number) {
		this._iva = value;
	}

	/**
	 * Setter discount
	 * @param {number} value
	 */
	public set discount(value: number) {
		this._discount = value;
	}

	/**
	 * Setter tax
	 * @param {number} value
	 */
	public set tax(value: number) {
		this._tax = value;
	}

	/**
	 * Setter totalsum
	 * @param {number} value
	 */
	public set totalsum(value: number) {
		this._totalsum = value;
	}
}
