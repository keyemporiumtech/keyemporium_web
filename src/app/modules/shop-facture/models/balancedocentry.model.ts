import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { PriceModel } from '../../shop-warehouse/models/price.model';
import { BalancedocModel } from './balancedoc.model';

export class BalancedocentryModel extends ApiModel {
	private _cod: string;
	private _name: string;
	private _description: string;
	private _quantity: number;
	private _dtainit: string;
	private _dtaend: string;
	private _price: PriceModel;
	private _balancedoc: BalancedocModel;

	public get dtainitModel(): DateModel {
		return new DateModel(this.dtainit);
	}
	public get dtainitFormat(): string {
		const dateModel = new DateModel(this.dtainit);
		return dateModel.toString();
	}

	public get dtaendModel(): DateModel {
		return new DateModel(this.dtaend);
	}
	public get dtaendFormat(): string {
		const dateModel = new DateModel(this.dtaend);
		return dateModel.toString();
	}

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
	 * Getter quantity
	 * @return {number}
	 */
	public get quantity(): number {
		return this._quantity;
	}

	/**
	 * Getter price
	 * @return {PriceModel}
	 */
	public get price(): PriceModel {
		return this._price;
	}

	/**
	 * Getter balancedoc
	 * @return {BalancedocModel}
	 */
	public get balancedoc(): BalancedocModel {
		return this._balancedoc;
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
	 * Setter quantity
	 * @param {number} value
	 */
	public set quantity(value: number) {
		this._quantity = value;
	}

	/**
	 * Setter price
	 * @param {PriceModel} value
	 */
	public set price(value: PriceModel) {
		this._price = value;
	}

	/**
	 * Setter balancedoc
	 * @param {BalancedocModel} value
	 */
	public set balancedoc(value: BalancedocModel) {
		this._balancedoc = value;
	}

	/**
	 * Getter dtainit
	 * @return {string}
	 */
	public get dtainit(): string {
		return this._dtainit;
	}

	/**
	 * Getter dtaend
	 * @return {string}
	 */
	public get dtaend(): string {
		return this._dtaend;
	}

	/**
	 * Setter dtainit
	 * @param {string} value
	 */
	public set dtainit(value: string) {
		this._dtainit = value;
	}

	/**
	 * Setter dtaend
	 * @param {string} value
	 */
	public set dtaend(value: string) {
		this._dtaend = value;
	}
}
