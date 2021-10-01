import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';

export class PhoneModel extends ApiModel {
	private _sendername: string;
	private _senderphone: string;
	private _message: string;
	private _flgdeleted: boolean;
	private _dtasend: string; // date

	public get dtasendModel(): DateModel {
		return new DateModel(this.dtasend);
	}
	public get dtasendFormat(): string {
		const dateModel = new DateModel(this.dtasend);
		return dateModel.toString();
	}

	/**
	 * Getter sendername
	 * @return {string}
	 */
	public get sendername(): string {
		return this._sendername;
	}

	/**
	 * Getter senderphone
	 * @return {string}
	 */
	public get senderphone(): string {
		return this._senderphone;
	}

	/**
	 * Getter message
	 * @return {string}
	 */
	public get message(): string {
		return this._message;
	}

	/**
	 * Getter flgdeleted
	 * @return {boolean}
	 */
	public get flgdeleted(): boolean {
		return this._flgdeleted;
	}

	/**
	 * Getter dtasend
	 * @return {string}
	 */
	public get dtasend(): string {
		return this._dtasend;
	}

	/**
	 * Setter sendername
	 * @param {string} value
	 */
	public set sendername(value: string) {
		this._sendername = value;
	}

	/**
	 * Setter senderphone
	 * @param {string} value
	 */
	public set senderphone(value: string) {
		this._senderphone = value;
	}

	/**
	 * Setter message
	 * @param {string} value
	 */
	public set message(value: string) {
		this._message = value;
	}

	/**
	 * Setter flgdeleted
	 * @param {boolean} value
	 */
	public set flgdeleted(value: boolean) {
		this._flgdeleted = value;
	}

	/**
	 * Setter dtasend
	 * @param {string} value
	 */
	public set dtasend(value: string) {
		this._dtasend = value;
	}
}
