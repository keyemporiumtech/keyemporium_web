import { ApiModel } from '../../api/cakeutils/base/api.model';
import { WorkskillModel } from '../../work-company/models/workskill.model';
import { ProfessionModel } from './profession.model';

export class ProfessionskillModel extends ApiModel {
	private _cod: string;
	private _gg: number;
	private _months: number;
	private _skill: WorkskillModel;
	private _levelval: number;
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
	 * Getter skill
	 * @return {WorkskillModel}
	 */
	public get skill(): WorkskillModel {
		return this._skill;
	}

	/**
	 * Getter levelval
	 * @return {number}
	 */
	public get levelval(): number {
		return this._levelval;
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
	 * Setter skill
	 * @param {WorkskillModel} value
	 */
	public set skill(value: WorkskillModel) {
		this._skill = value;
	}

	/**
	 * Setter levelval
	 * @param {number} value
	 */
	public set levelval(value: number) {
		this._levelval = value;
	}

	/**
	 * Setter profession
	 * @param {ProfessionModel} value
	 */
	public set profession(value: ProfessionModel) {
		this._profession = value;
	}
}
