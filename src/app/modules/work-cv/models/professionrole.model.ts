import { ApiModel } from '../../api/cakeutils/base/api.model';
import { WorkroleModel } from '../../work-company/models/workrole.model';
import { ProfessionModel } from './profession.model';

export class ProfessionroleModel extends ApiModel {
	private _cod: string;
	private _gg: number;
	private _months: number;
	private _role: WorkroleModel;
	private _profession: ProfessionModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter gg
	 * @return {number}
	 */
	public get gg(): number {
		return this._gg;
	}

	/**
	 * Getter months
	 * @return {number}
	 */
	public get months(): number {
		return this._months;
	}

	/**
	 * Getter role
	 * @return {WorkroleModel}
	 */
	public get role(): WorkroleModel {
		return this._role;
	}

	/**
	 * Getter profession
	 * @return {ProfessionModel}
	 */
	public get profession(): ProfessionModel {
		return this._profession;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter gg
	 * @param {number} value
	 */
	public set gg(value: number) {
		this._gg = value;
	}

	/**
	 * Setter months
	 * @param {number} value
	 */
	public set months(value: number) {
		this._months = value;
	}

	/**
	 * Setter role
	 * @param {WorkroleModel} value
	 */
	public set role(value: WorkroleModel) {
		this._role = value;
	}

	/**
	 * Setter profession
	 * @param {ProfessionModel} value
	 */
	public set profession(value: ProfessionModel) {
		this._profession = value;
	}
}
