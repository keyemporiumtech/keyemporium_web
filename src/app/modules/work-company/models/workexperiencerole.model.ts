import { ApiModel } from '../../api/cakeutils/base/api.model';
import { WorkexperienceModel } from './workexperience.model';
import { WorkroleModel } from './workrole.model';

export class WorkexperienceroleModel extends ApiModel {
	private _cod: string;
	private _gg: number;
	private _months: number;
	private _role: WorkroleModel;
	private _experience: WorkexperienceModel;

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
	 * Getter experience
	 * @return {WorkexperienceModel}
	 */
	public get experience(): WorkexperienceModel {
		return this._experience;
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
	 * Setter experience
	 * @param {WorkexperienceModel} value
	 */
	public set experience(value: WorkexperienceModel) {
		this._experience = value;
	}
}
