import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ProductModel } from '../../shop-warehouse/models/product.model';
import { BasketModel } from './basket.model';

export class BasketproductModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _product: ProductModel;
	private _basket: BasketModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter title
	 * @return {string}
	 */
	public get title(): string {
		return this._title;
	}

	/**
	 * Getter product
	 * @return {ProductModel}
	 */
	public get product(): ProductModel {
		return this._product;
	}

	/**
	 * Getter basket
	 * @return {BasketModel}
	 */
	public get basket(): BasketModel {
		return this._basket;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter title
	 * @param {string} value
	 */
	public set title(value: string) {
		this._title = value;
	}

	/**
	 * Setter product
	 * @param {ProductModel} value
	 */
	public set product(value: ProductModel) {
		this._product = value;
	}

	/**
	 * Setter basket
	 * @param {BasketModel} value
	 */
	public set basket(value: BasketModel) {
		this._basket = value;
	}
}
