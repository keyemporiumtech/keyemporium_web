import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';

export class MailModel extends ApiModel {
	private _ipname: string;
	private _subject: string;
	private _sendername: string;
	private _senderemail: string;
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
	 * Getter ipname
	 * @return {string}
	 */
	public get ipname(): string {
		return this._ipname;
	}

	/**
	 * Getter subject
	 * @return {string}
	 */
	public get subject(): string {
		return this._subject;
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
	 * Setter ipname
	 * @param {string} value
	 */
	public set ipname(value: string) {
		this._ipname = value;
	}

	/**
	 * Setter subject
	 * @param {string} value
	 */
	public set subject(value: string) {
		this._subject = value;
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
