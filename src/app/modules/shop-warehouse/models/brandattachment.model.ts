import { ApiModel } from '../../api/cakeutils/base/api.model';
import { BrandModel } from './brand.model';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class BrandattachmentModel extends ApiModel {
	private _cod: string;
	private _brand: BrandModel;
	private _attachment: AttachmentModel;

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
	 * Getter attachment
	 * @return {AttachmentModel}
	 */
	public get attachment(): AttachmentModel {
		return this._attachment;
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
	 * Setter attachment
	 * @param {AttachmentModel} value
	 */
	public set attachment(value: AttachmentModel) {
		this._attachment = value;
	}
}
