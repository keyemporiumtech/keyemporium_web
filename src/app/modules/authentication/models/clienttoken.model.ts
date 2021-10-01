import { ApiModel } from '../../api/cakeutils/base/api.model';

export class ClienttokenModel extends ApiModel {
	private _appname: string;
	private _token: string;

	/**
	 * Getter appname
	 * @return {string}
	 */
	public get appname(): string {
		return this._appname;
	}

	/**
	 * Getter token
	 * @return {string}
	 */
	public get token(): string {
		return this._token;
	}

	/**
	 * Setter appname
	 * @param {string} value
	 */
	public set appname(value: string) {
		this._appname = value;
	}

	/**
	 * Setter token
	 * @param {string} value
	 */
	public set token(value: string) {
		this._token = value;
	}
}
