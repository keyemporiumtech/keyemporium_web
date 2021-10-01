import { ApiModel } from '../../api/cakeutils/base/api.model';
import { PhoneModel } from './phone.model';
import { PhonereceiverModel } from './phonereceiver.model';

export class PhoneDetailModel extends ApiModel {
	private _phone: PhoneModel;
	private _destinators: PhonereceiverModel[];
	private _body: string;
	private _html: string;

	/**
	 * Getter phone
	 * @return {PhoneModel}
	 */
	public get phone(): PhoneModel {
		return this._phone;
	}

	/**
	 * Getter destinators
	 * @return {PhonereceiverModel[]}
	 */
	public get destinators(): PhonereceiverModel[] {
		return this._destinators;
	}

	/**
	 * Getter body
	 * @return {string}
	 */
	public get body(): string {
		return this._body;
	}

	/**
	 * Getter html
	 * @return {string}
	 */
	public get html(): string {
		return this._html;
	}

	/**
	 * Setter phone
	 * @param {PhoneModel} value
	 */
	public set phone(value: PhoneModel) {
		this._phone = value;
	}

	/**
	 * Setter destinators
	 * @param {PhonereceiverModel[]} value
	 */
	public set destinators(value: PhonereceiverModel[]) {
		this._destinators = value;
	}

	/**
	 * Setter body
	 * @param {string} value
	 */
	public set body(value: string) {
		this._body = value;
	}

	/**
	 * Setter html
	 * @param {string} value
	 */
	public set html(value: string) {
		this._html = value;
	}
}
