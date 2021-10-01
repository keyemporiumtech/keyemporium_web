import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { MailModel } from './mail.model';

export class MailreceiverModel extends ApiModel {
	private _mail: MailModel;
	private _receivername: string;
	private _receiveremail: string;
	private _flgcc: boolean;
	private _flgccn: boolean;
	private _flgreaded: boolean;
	private _dtaread: string; // date
	private _dtareceive: string; // date

	public get dtareadModel(): DateModel {
		return new DateModel(this.dtaread);
	}
	public get dtareadFormat(): string {
		const dateModel = new DateModel(this.dtaread);
		return dateModel.toString();
	}

	public get dtareceiveModel(): DateModel {
		return new DateModel(this.dtareceive);
	}
	public get dtareceiveFormat(): string {
		const dateModel = new DateModel(this.dtareceive);
		return dateModel.toString();
	}

	/**
	 * Getter mail
	 * @return {MailModel}
	 */
	public get mail(): MailModel {
		return this._mail;
	}

	/**
	 * Getter receivername
	 * @return {string}
	 */
	public get receivername(): string {
		return this._receivername;
	}

	/**
	 * Getter receiveremail
	 * @return {string}
	 */
	public get receiveremail(): string {
		return this._receiveremail;
	}

	/**
	 * Getter flgcc
	 * @return {boolean}
	 */
	public get flgcc(): boolean {
		return this._flgcc;
	}

	/**
	 * Getter flgccn
	 * @return {boolean}
	 */
	public get flgccn(): boolean {
		return this._flgccn;
	}

	/**
	 * Getter flgreaded
	 * @return {boolean}
	 */
	public get flgreaded(): boolean {
		return this._flgreaded;
	}

	/**
	 * Getter dtaread
	 * @return {string}
	 */
	public get dtaread(): string {
		return this._dtaread;
	}

	/**
	 * Getter dtareceive
	 * @return {string}
	 */
	public get dtareceive(): string {
		return this._dtareceive;
	}

	/**
	 * Setter mail
	 * @param {MailModel} value
	 */
	public set mail(value: MailModel) {
		this._mail = value;
	}

	/**
	 * Setter receivername
	 * @param {string} value
	 */
	public set receivername(value: string) {
		this._receivername = value;
	}

	/**
	 * Setter receiveremail
	 * @param {string} value
	 */
	public set receiveremail(value: string) {
		this._receiveremail = value;
	}

	/**
	 * Setter flgcc
	 * @param {boolean} value
	 */
	public set flgcc(value: boolean) {
		this._flgcc = value;
	}

	/**
	 * Setter flgccn
	 * @param {boolean} value
	 */
	public set flgccn(value: boolean) {
		this._flgccn = value;
	}

	/**
	 * Setter flgreaded
	 * @param {boolean} value
	 */
	public set flgreaded(value: boolean) {
		this._flgreaded = value;
	}

	/**
	 * Setter dtaread
	 * @param {string} value
	 */
	public set dtaread(value: string) {
		this._dtaread = value;
	}

	/**
	 * Setter dtareceive
	 * @param {string} value
	 */
	public set dtareceive(value: string) {
		this._dtareceive = value;
	}
}
