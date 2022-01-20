import { ApiModel } from '../../cakeutils/base/api.model';
import { GroupModel } from './group.model';

export class GrouprelationModel extends ApiModel {
	private _cod: string;
	private _group: GroupModel;
	private _groupcod: string;
	private _tablename: string;
	private _tableid: string;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter group
	 * @return {GroupModel}
	 */
	public get group(): GroupModel {
		return this._group;
	}

	/**
	 * Getter groupcod
	 * @return {string}
	 */
	public get groupcod(): string {
		return this._groupcod;
	}

	/**
	 * Getter tablename
	 * @return {string}
	 */
	public get tablename(): string {
		return this._tablename;
	}

	/**
	 * Getter tableid
	 * @return {string}
	 */
	public get tableid(): string {
		return this._tableid;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter group
	 * @param {GroupModel} value
	 */
	public set group(value: GroupModel) {
		this._group = value;
	}

	/**
	 * Setter groupcod
	 * @param {string} value
	 */
	public set groupcod(value: string) {
		this._groupcod = value;
	}

	/**
	 * Setter tablename
	 * @param {string} value
	 */
	public set tablename(value: string) {
		this._tablename = value;
	}

	/**
	 * Setter tableid
	 * @param {string} value
	 */
	public set tableid(value: string) {
		this._tableid = value;
	}
}
