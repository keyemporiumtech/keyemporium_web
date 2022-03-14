import { ApiModel } from '../../api/cakeutils/base/api.model';
import { CategoryModel } from './category.model';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class CategoryattachmentModel extends ApiModel {
	private _cod: string;
	private _category: CategoryModel;
	private _attachment: AttachmentModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter category
	 * @return {CategoryModel}
	 */
	public get category(): CategoryModel {
		return this._category;
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
	 * Setter category
	 * @param {CategoryModel} value
	 */
	public set category(value: CategoryModel) {
		this._category = value;
	}

	/**
	 * Setter attachment
	 * @param {AttachmentModel} value
	 */
	public set attachment(value: AttachmentModel) {
		this._attachment = value;
	}
}
