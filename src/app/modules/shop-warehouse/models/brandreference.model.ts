import { ApiModel } from '../../api/cakeutils/base/api.model';
import { BrandModel } from './brand.model';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';

export class BrandreferenceModel extends ApiModel {
	private _cod: string;
	private _brand: BrandModel;
	private _contactreference: ContactreferenceModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter brand
	 * @return {BrandModel}
	 */
	public get brand(): BrandModel {
		return this._brand;
	}

	/**
	 * Getter contactreference
	 * @return {ContactreferenceModel}
	 */
	public get contactreference(): ContactreferenceModel {
		return this._contactreference;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter brand
	 * @param {BrandModel} value
	 */
	public set brand(value: BrandModel) {
		this._brand = value;
	}

	/**
	 * Setter contactreference
	 * @param {ContactreferenceModel} value
	 */
	public set contactreference(value: ContactreferenceModel) {
		this._contactreference = value;
	}
}
