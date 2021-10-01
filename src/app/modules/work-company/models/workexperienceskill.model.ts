import { ApiModel } from '../../api/cakeutils/base/api.model';
import { WorkexperienceModel } from './workexperience.model';
import { WorkskillModel } from './workskill.model';

export class WorkexperienceskillModel extends ApiModel {
	private _cod: string;
	private _gg: number;
	private _months: number;
	private _skill: WorkskillModel;
	private _levelval: number;
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
	 * Setter experience
	 * @param {WorkexperienceModel} value
	 */
	public set experience(value: WorkexperienceModel) {
		this._experience = value;
	}
}
