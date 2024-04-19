import { ApiModel } from '../../api/cakeutils/base/api.model';
import { CurrencyModel } from '../../util-currency/models/currency.model';
import { BalancedocModel } from './balancedoc.model';

export class BalancedoctransportModel extends ApiModel {
	private _cod: string;
	private _company: string;
	private _driver: string;
	private _packages: number;
	private _weight: number;
	private _deposit: number;
	private _cost: number;
	private _packingcost: number;
	private _recessedcost: number;
	private _balancedoc: BalancedocModel;
	private _currency: CurrencyModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter company
	 * @return {string}
	 */
	public get company(): string {
		return this._company;
	}

	/**
	 * Getter driver
	 * @return {string}
	 */
	public get driver(): string {
		return this._driver;
	}

	/**
	 * Getter packages
	 * @return {number}
	 */
	public get packages(): number {
		return this._packages;
	}

	/**
	 * Getter weight
	 * @return {number}
	 */
	public get weight(): number {
		return this._weight;
	}

	/**
	 * Getter deposit
	 * @return {number}
	 */
	public get deposit(): number {
		return this._deposit;
	}

	/**
	 * Getter cost
	 * @return {number}
	 */
	public get cost(): number {
		return this._cost;
	}

	/**
	 * Getter packingcost
	 * @return {number}
	 */
	public get packingcost(): number {
		return this._packingcost;
	}

	/**
	 * Getter recessedcost
	 * @return {number}
	 */
	public get recessedcost(): number {
		return this._recessedcost;
	}

	/**
	 * Getter balancedoc
	 * @return {BalancedocModel}
	 */
	public get balancedoc(): BalancedocModel {
		return this._balancedoc;
	}

	/**
	 * Getter currency
	 * @return {CurrencyModel}
	 */
	public get currency(): CurrencyModel {
		return this._currency;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter company
	 * @param {string} value
	 */
	public set company(value: string) {
		this._company = value;
	}

	/**
	 * Setter driver
	 * @param {string} value
	 */
	public set driver(value: string) {
		this._driver = value;
	}

	/**
	 * Setter packages
	 * @param {number} value
	 */
	public set packages(value: number) {
		this._packages = value;
	}

	/**
	 * Setter weight
	 * @param {number} value
	 */
	public set weight(value: number) {
		this._weight = value;
	}

	/**
	 * Setter deposit
	 * @param {number} value
	 */
	public set deposit(value: number) {
		this._deposit = value;
	}

	/**
	 * Setter cost
	 * @param {number} value
	 */
	public set cost(value: number) {
		this._cost = value;
	}

	/**
	 * Setter packingcost
	 * @param {number} value
	 */
	public set packingcost(value: number) {
		this._packingcost = value;
	}

	/**
	 * Setter recessedcost
	 * @param {number} value
	 */
	public set recessedcost(value: number) {
		this._recessedcost = value;
	}

	/**
	 * Setter balancedoc
	 * @param {BalancedocModel} value
	 */
	public set balancedoc(value: BalancedocModel) {
		this._balancedoc = value;
	}

	/**
	 * Setter currency
	 * @param {CurrencyModel} value
	 */
	public set currency(value: CurrencyModel) {
		this._currency = value;
	}
}
