import { ApiModel } from '../../api/cakeutils/base/api.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { PriceModel } from './price.model';

export class PocketModel extends ApiModel {
	private _cod: string;
	private _name: string;
	private _description: string;
	private _image: AttachmentModel;
	private _price: PriceModel;
	private _note: string;
	private _flgreleted: boolean;
	private _flgdeleted: boolean;

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
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter image
	 * @return {AttachmentModel}
	 */
	public get image(): AttachmentModel {
		return this._image;
	}

	/**
	 * Getter price
	 * @return {PriceModel}
	 */
	public get price(): PriceModel {
		return this._price;
	}

	/**
	 * Getter note
	 * @return {string}
	 */
	public get note(): string {
		return this._note;
	}

	/**
	 * Getter flgreleted
	 * @return {boolean}
	 */
	public get flgreleted(): boolean {
		return this._flgreleted;
	}

	/**
	 * Getter flgdeleted
	 * @return {boolean}
	 */
	public get flgdeleted(): boolean {
		return this._flgdeleted;
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
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter image
	 * @param {AttachmentModel} value
	 */
	public set image(value: AttachmentModel) {
		this._image = value;
	}

	/**
	 * Setter price
	 * @param {PriceModel} value
	 */
	public set price(value: PriceModel) {
		this._price = value;
	}

	/**
	 * Setter note
	 * @param {string} value
	 */
	public set note(value: string) {
		this._note = value;
	}

	/**
	 * Setter flgreleted
	 * @param {boolean} value
	 */
	public set flgreleted(value: boolean) {
		this._flgreleted = value;
	}

	/**
	 * Setter flgdeleted
	 * @param {boolean} value
	 */
	public set flgdeleted(value: boolean) {
		this._flgdeleted = value;
	}
}
