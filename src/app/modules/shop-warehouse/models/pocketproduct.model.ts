import { ApiModel } from '../../api/cakeutils/base/api.model';
import { PocketModel } from './pocket.model';
import { ProductModel } from './product.model';

export class PocketproductModel extends ApiModel {
	private _cod: string;
	private _pocket: PocketModel;
	private _product: ProductModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter pocket
	 * @return {PocketModel}
	 */
	public get pocket(): PocketModel {
		return this._pocket;
	}

	/**
	 * Getter product
	 * @return {ProductModel}
	 */
	public get product(): ProductModel {
		return this._product;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter pocket
	 * @param {PocketModel} value
	 */
	public set pocket(value: PocketModel) {
		this._pocket = value;
	}

	/**
	 * Setter product
	 * @param {ProductModel} value
	 */
	public set product(value: ProductModel) {
		this._product = value;
	}
}
