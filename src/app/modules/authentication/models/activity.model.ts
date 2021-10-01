import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { EnumActivityType } from '../enums/activity-type.enum';

export class ActivityModel extends ApiModel {
	private _name: string;
	private _namecod: string;
	private _description: string;
	private _piva: string;
	private _born: string; // date
	private _tpactivity: TypologicalModel;
	private _tpcat: TypologicalModel;
	private _parent: ActivityModel;
	private _lft: string;
	private _rght: string;
	// enums
	private _tpactivityEnum: EnumActivityType;

	public get bornModel(): DateModel {
		return new DateModel(this.born);
	}
	public get bornFormat(): string {
		const dateModel = new DateModel(this.born);
		return dateModel.toString();
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter namecod
	 * @return {string}
	 */
	public get namecod(): string {
		return this._namecod;
	}

	/**
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter piva
	 * @return {string}
	 */
	public get piva(): string {
		return this._piva;
	}

	/**
	 * Getter born
	 * @return {string}
	 */
	public get born(): string {
		return this._born;
	}

	/**
	 * Getter tpactivity
	 * @return {TypologicalModel}
	 */
	public get tpactivity(): TypologicalModel {
		return this._tpactivity;
	}

	/**
	 * Getter tpcat
	 * @return {TypologicalModel}
	 */
	public get tpcat(): TypologicalModel {
		return this._tpcat;
	}

	/**
	 * Getter parent
	 * @return {ActivityModel}
	 */
	public get parent(): ActivityModel {
		return this._parent;
	}

	/**
	 * Getter lft
	 * @return {string}
	 */
	public get lft(): string {
		return this._lft;
	}

	/**
	 * Getter rght
	 * @return {string}
	 */
	public get rght(): string {
		return this._rght;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter namecod
	 * @param {string} value
	 */
	public set namecod(value: string) {
		this._namecod = value;
	}

	/**
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter piva
	 * @param {string} value
	 */
	public set piva(value: string) {
		this._piva = value;
	}

	/**
	 * Setter born
	 * @param {string} value
	 */
	public set born(value: string) {
		this._born = value;
	}

	/**
	 * Setter tpactivity
	 * @param {TypologicalModel} value
	 */
	public set tpactivity(value: TypologicalModel) {
		this._tpactivity = value;
	}

	/**
	 * Setter tpcat
	 * @param {TypologicalModel} value
	 */
	public set tpcat(value: TypologicalModel) {
		this._tpcat = value;
	}

	/**
	 * Setter parent
	 * @param {ActivityModel} value
	 */
	public set parent(value: ActivityModel) {
		this._parent = value;
	}

	/**
	 * Setter lft
	 * @param {string} value
	 */
	public set lft(value: string) {
		this._lft = value;
	}

	/**
	 * Setter rght
	 * @param {string} value
	 */
	public set rght(value: string) {
		this._rght = value;
	}

	/**
	 * Getter tpactivityEnum
	 * @return {EnumActivityType}
	 */
	public get tpactivityEnum(): EnumActivityType {
		return this._tpactivityEnum;
	}

	/**
	 * Setter tpactivityEnum
	 * @param {EnumActivityType} value
	 */
	public set tpactivityEnum(value: EnumActivityType) {
		this._tpactivityEnum = value;
	}
}
