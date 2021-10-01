import { ApiModel } from '../../api/cakeutils/base/api.model';

export class MailerModel extends ApiModel {
	private _cod: string;
	private _name: string;
	private _host: string;
	private _port: string;
	private _username: string;
	private _password: string;
	private _sendername: string;
	private _senderemail: string;
	private _crypttype: string;

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
	 * Getter username
	 * @return {string}
	 */
	public get username(): string {
		return this._username;
	}

	/**
	 * Getter password
	 * @return {string}
	 */
	public get password(): string {
		return this._password;
	}

	/**
	 * Getter sendername
	 * @return {string}
	 */
	public get sendername(): string {
		return this._sendername;
	}

	/**
	 * Getter senderemail
	 * @return {string}
	 */
	public get senderemail(): string {
		return this._senderemail;
	}

	/**
	 * Getter crypttype
	 * @return {string}
	 */
	public get crypttype(): string {
		return this._crypttype;
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
	 * Setter username
	 * @param {string} value
	 */
	public set username(value: string) {
		this._username = value;
	}

	/**
	 * Setter password
	 * @param {string} value
	 */
	public set password(value: string) {
		this._password = value;
	}

	/**
	 * Setter sendername
	 * @param {string} value
	 */
	public set sendername(value: string) {
		this._sendername = value;
	}

	/**
	 * Setter senderemail
	 * @param {string} value
	 */
	public set senderemail(value: string) {
		this._senderemail = value;
	}

	/**
	 * Setter crypttype
	 * @param {string} value
	 */
	public set crypttype(value: string) {
		this._crypttype = value;
	}
}
