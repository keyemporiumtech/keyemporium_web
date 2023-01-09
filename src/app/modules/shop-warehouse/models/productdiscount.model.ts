import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ProductModel } from './product.model';
import { DiscountModel } from './discount.model';

export class ProductdiscountModel extends ApiModel {
	private _cod: string;
	private _product: ProductModel;
	private _discount: DiscountModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter product
	 * @return {ProductModel}
	 */
	public get product(): ProductModel {
		return this._product;
	}

	/**
	 * Getter discount
	 * @return {DiscountModel}
	 */
	public get discount(): DiscountModel {
		return this._discount;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter product
	 * @param {ProductModel} value
	 */
	public set product(value: ProductModel) {
		this._product = value;
	}

	/**
	 * Setter discount
	 * @param {DiscountModel} value
	 */
	public set discount(value: DiscountModel) {
		this._discount = value;
	}
}
