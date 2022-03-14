import { ApiModel } from '../../api/cakeutils/base/api.model';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class CategoryModel extends ApiModel {
	private _cod: string;
	private _name: string;
	private _description: string;
	private _image: AttachmentModel;
	private _parent: CategoryModel;
	private _lft: number;
	private _rght: number;
	private _reftable: string;

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
	 * Getter parent
	 * @return {CategoryModel}
	 */
	public get parent(): CategoryModel {
		return this._parent;
	}

	/**
	 * Getter lft
	 * @return {number}
	 */
	public get lft(): number {
		return this._lft;
	}

	/**
	 * Getter rght
	 * @return {number}
	 */
	public get rght(): number {
		return this._rght;
	}

	/**
	 * Getter reftable
	 * @return {string}
	 */
	public get reftable(): string {
		return this._reftable;
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
	 * Setter parent
	 * @param {CategoryModel} value
	 */
	public set parent(value: CategoryModel) {
		this._parent = value;
	}

	/**
	 * Setter lft
	 * @param {number} value
	 */
	public set lft(value: number) {
		this._lft = value;
	}

	/**
	 * Setter rght
	 * @param {number} value
	 */
	public set rght(value: number) {
		this._rght = value;
	}

	/**
	 * Setter reftable
	 * @param {string} value
	 */
	public set reftable(value: string) {
		this._reftable = value;
	}
}
