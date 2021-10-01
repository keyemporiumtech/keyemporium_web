import { ApiModel } from '../../api/cakeutils/base/api.model';
import { UserModel } from './user.model';

export class ConfirmoperationModel extends ApiModel {
	private _codoperation: string;
	private _description: string;
	private _phone: string;
	private _codsms: string;
	private _email: string;
	private _codemail: string;
	private _user: UserModel;
	private _token: string;
	private _flgaccepted: boolean;
	private _flgclosed: boolean;

	/**
	 * Getter codoperation
	 * @return {string}
	 */
	public get codoperation(): string {
		return this._codoperation;
	}

	/**
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter phone
	 * @return {string}
	 */
	public get phone(): string {
		return this._phone;
	}

	/**
	 * Getter codsms
	 * @return {string}
	 */
	public get codsms(): string {
		return this._codsms;
	}

	/**
	 * Getter email
	 * @return {string}
	 */
	public get email(): string {
		return this._email;
	}

	/**
	 * Getter codemail
	 * @return {string}
	 */
	public get codemail(): string {
		return this._codemail;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
	}

	/**
	 * Getter token
	 * @return {string}
	 */
	public get token(): string {
		return this._token;
	}

	/**
	 * Getter flgaccepted
	 * @return {boolean}
	 */
	public get flgaccepted(): boolean {
		return this._flgaccepted;
	}

	/**
	 * Getter flgclosed
	 * @return {boolean}
	 */
	public get flgclosed(): boolean {
		return this._flgclosed;
	}

	/**
	 * Setter codoperation
	 * @param {string} value
	 */
	public set codoperation(value: string) {
		this._codoperation = value;
	}

	/**
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter phone
	 * @param {string} value
	 */
	public set phone(value: string) {
		this._phone = value;
	}

	/**
	 * Setter codsms
	 * @param {string} value
	 */
	public set codsms(value: string) {
		this._codsms = value;
	}

	/**
	 * Setter email
	 * @param {string} value
	 */
	public set email(value: string) {
		this._email = value;
	}

	/**
	 * Setter codemail
	 * @param {string} value
	 */
	public set codemail(value: string) {
		this._codemail = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter token
	 * @param {string} value
	 */
	public set token(value: string) {
		this._token = value;
	}

	/**
	 * Setter flgaccepted
	 * @param {boolean} value
	 */
	public set flgaccepted(value: boolean) {
		this._flgaccepted = value;
	}

	/**
	 * Setter flgclosed
	 * @param {boolean} value
	 */
	public set flgclosed(value: boolean) {
		this._flgclosed = value;
	}
}
