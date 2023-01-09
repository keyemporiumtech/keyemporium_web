import { ApiModel } from '../../api/cakeutils/base/api.model';

export class MailConfigModel extends ApiModel {
	private _host: string;
	private _port: string;
	private _user: string;
	private _password: string;
	private _passwordCrypted: string;

	/**
	 * Getter host
	 * @return {string}
	 */
	public get host(): string {
		return this._host;
	}

	/**
	 * Getter port
	 * @return {string}
	 */
	public get port(): string {
		return this._port;
	}

	/**
	 * Getter user
	 * @return {string}
	 */
	public get user(): string {
		return this._user;
	}

	/**
	 * Getter password
	 * @return {string}
	 */
	public get password(): string {
		return this._password;
	}

	/**
	 * Getter passwordCrypted
	 * @return {string}
	 */
	public get passwordCrypted(): string {
		return this._passwordCrypted;
	}

	/**
	 * Setter host
	 * @param {string} value
	 */
	public set host(value: string) {
		this._host = value;
	}

	/**
	 * Setter port
	 * @param {string} value
	 */
	public set port(value: string) {
		this._port = value;
	}

	/**
	 * Setter user
	 * @param {string} value
	 */
	public set user(value: string) {
		this._user = value;
	}

	/**
	 * Setter password
	 * @param {string} value
	 */
	public set password(value: string) {
		this._password = value;
	}

	/**
	 * Setter passwordCrypted
	 * @param {string} value
	 */
	public set passwordCrypted(value: string) {
		this._passwordCrypted = value;
	}
}
