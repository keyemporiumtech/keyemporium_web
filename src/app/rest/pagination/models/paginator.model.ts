import { BaseModel } from '@ddc/kit';

export class PaginatorModel extends BaseModel {
	private _list: any[];
	private _pages: number;
	private _count: number;
	private _currentPage: number;
	private _limit: number;

	/**
	 * Getter list
	 * @return any[]
	 */
	public get list(): any[] {
		return this._list;
	}

	/**
	 * Setter list
	 * @param any[] value
	 */
	public set list(value: any[]) {
		this._list = value;
	}

	/**
	 * Getter pages
	 * @return number
	 */
	public get pages(): number {
		return this._pages;
	}

	/**
	 * Setter pages
	 * @param number value
	 */
	public set pages(value: number) {
		this._pages = value;
	}

	/**
	 * Getter count
	 * @return number
	 */
	public get count(): number {
		return this._count;
	}

	/**
	 * Setter count
	 * @param number value
	 */
	public set count(value: number) {
		this._count = value;
	}

	/**
	 * Getter currentPage
	 * @return number
	 */
	public get currentPage(): number {
		return this._currentPage;
	}

	/**
	 * Setter currentPage
	 * @param number value
	 */
	public set currentPage(value: number) {
		this._currentPage = value;
	}

	/**
	 * Getter limit
	 * @return number
	 */
	public get limit(): number {
		return this._limit;
	}

	/**
	 * Setter limit
	 * @param number value
	 */
	public set limit(value: number) {
		this._limit = value;
	}
}
