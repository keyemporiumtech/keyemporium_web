import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { PhoneModel } from './phone.model';

export class PhonereceiverModel extends ApiModel {
	private _phone: PhoneModel;
	private _receivername: string;
	private _receiverphone: string;
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
	 * Getter phone
	 * @return {PhoneModel}
	 */
	public get phone(): PhoneModel {
		return this._phone;
	}

	/**
	 * Getter receivername
	 * @return {string}
	 */
	public get receivername(): string {
		return this._receivername;
	}

	/**
	 * Getter receiverphone
	 * @return {string}
	 */
	public get receiverphone(): string {
		return this._receiverphone;
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
	 * Setter phone
	 * @param {PhoneModel} value
	 */
	public set phone(value: PhoneModel) {
		this._phone = value;
	}

	/**
	 * Setter receivername
	 * @param {string} value
	 */
	public set receivername(value: string) {
		this._receivername = value;
	}

	/**
	 * Setter receiverphone
	 * @param {string} value
	 */
	public set receiverphone(value: string) {
		this._receiverphone = value;
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
