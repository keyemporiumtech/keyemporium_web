import { ApiModel } from '../../api/cakeutils/base/api.model';
import { UserModel } from './user.model';

export class UserreportModel extends ApiModel {
	private _codoperation: string;
	private _description: string;
	private _sessionid: string;
	private _ip: string;
	private _os: string;
	private _browser: string;
	private _browser_version: string;
	private _user: UserModel;

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
	 * Getter sessionid
	 * @return {string}
	 */
	public get sessionid(): string {
		return this._sessionid;
	}

	/**
	 * Getter ip
	 * @return {string}
	 */
	public get ip(): string {
		return this._ip;
	}

	/**
	 * Getter os
	 * @return {string}
	 */
	public get os(): string {
		return this._os;
	}

	/**
	 * Getter browser
	 * @return {string}
	 */
	public get browser(): string {
		return this._browser;
	}

	/**
	 * Getter browser_version
	 * @return {string}
	 */
	public get browser_version(): string {
		return this._browser_version;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
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
	 * Setter sessionid
	 * @param {string} value
	 */
	public set sessionid(value: string) {
		this._sessionid = value;
	}

	/**
	 * Setter ip
	 * @param {string} value
	 */
	public set ip(value: string) {
		this._ip = value;
	}

	/**
	 * Setter os
	 * @param {string} value
	 */
	public set os(value: string) {
		this._os = value;
	}

	/**
	 * Setter browser
	 * @param {string} value
	 */
	public set browser(value: string) {
		this._browser = value;
	}

	/**
	 * Setter browser_version
	 * @param {string} value
	 */
	public set browser_version(value: string) {
		this._browser_version = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}
}
