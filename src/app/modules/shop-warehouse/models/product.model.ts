import { ApiModel } from '../../api/cakeutils/base/api.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { BrandModel } from './brand.model';
import { CategoryModel } from './category.model';
import { PriceModel } from './price.model';

export class ProductModel extends ApiModel {
	private _cod: string;
	private _name: string;
	private _description: string;
	private _image: AttachmentModel;
	private _quantity: number;
	private _brand: BrandModel;
	private _category: CategoryModel;
	private _price: PriceModel;
	private _note: string;
	private _weight: number;
	private _width: number;
	private _height: number;
	private _flgdeleted: boolean;
	private _flgwarehouse: boolean;
	private _flgreserve: boolean;

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
	 * Getter quantity
	 * @return {number}
	 */
	public get quantity(): number {
		return this._quantity;
	}

	/**
	 * Getter brand
	 * @return {BrandModel}
	 */
	public get brand(): BrandModel {
		return this._brand;
	}

	/**
	 * Getter category
	 * @return {CategoryModel}
	 */
	public get category(): CategoryModel {
		return this._category;
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
	 * Getter weight
	 * @return {number}
	 */
	public get weight(): number {
		return this._weight;
	}

	/**
	 * Getter width
	 * @return {number}
	 */
	public get width(): number {
		return this._width;
	}

	/**
	 * Getter height
	 * @return {number}
	 */
	public get height(): number {
		return this._height;
	}

	/**
	 * Getter flgdeleted
	 * @return {boolean}
	 */
	public get flgdeleted(): boolean {
		return this._flgdeleted;
	}

	/**
	 * Getter flgwarehouse
	 * @return {boolean}
	 */
	public get flgwarehouse(): boolean {
		return this._flgwarehouse;
	}

	/**
	 * Getter flgreserve
	 * @return {boolean}
	 */
	public get flgreserve(): boolean {
		return this._flgreserve;
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
	 * Setter quantity
	 * @param {number} value
	 */
	public set quantity(value: number) {
		this._quantity = value;
	}

	/**
	 * Setter brand
	 * @param {BrandModel} value
	 */
	public set brand(value: BrandModel) {
		this._brand = value;
	}

	/**
	 * Setter category
	 * @param {CategoryModel} value
	 */
	public set category(value: CategoryModel) {
		this._category = value;
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
	 * Setter weight
	 * @param {number} value
	 */
	public set weight(value: number) {
		this._weight = value;
	}

	/**
	 * Setter width
	 * @param {number} value
	 */
	public set width(value: number) {
		this._width = value;
	}

	/**
	 * Setter height
	 * @param {number} value
	 */
	public set height(value: number) {
		this._height = value;
	}

	/**
	 * Setter flgdeleted
	 * @param {boolean} value
	 */
	public set flgdeleted(value: boolean) {
		this._flgdeleted = value;
	}

	/**
	 * Setter flgwarehouse
	 * @param {boolean} value
	 */
	public set flgwarehouse(value: boolean) {
		this._flgwarehouse = value;
	}

	/**
	 * Setter flgreserve
	 * @param {boolean} value
	 */
	public set flgreserve(value: boolean) {
		this._flgreserve = value;
	}
}
