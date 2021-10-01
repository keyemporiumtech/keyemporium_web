export class TreeHtmlModel {
	private _id: any;
	private _name: string;
	private _children: TreeHtmlModel[] = [];
	private _hasChildren: boolean;
	private _isExpanded: boolean;

	/**
	 * Getter id
	 * @return any
	 */
	public get id(): any {
		return this._id;
	}

	/**
	 * Setter id
	 * @param any value
	 */
	public set id(value: any) {
		this._id = value;
	}

	/**
	 * Getter name
	 * @return string
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter children
	 * @return TreeHtmlModel[]
	 */
	public get children(): TreeHtmlModel[] {
		return this._children;
	}

	/**
	 * Setter name
	 * @param string value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter children
	 * @param TreeHtmlModel[] value
	 */
	public set children(value: TreeHtmlModel[]) {
		this._children = value;
	}

	/**
	 * Getter hasChildren
	 * @return boolean
	 */
	public get hasChildren(): boolean {
		return this._hasChildren;
	}

	/**
	 * Getter isExpanded
	 * @return boolean
	 */
	public get isExpanded(): boolean {
		return this._isExpanded;
	}

	/**
	 * Setter hasChildren
	 * @param boolean value
	 */
	public set hasChildren(value: boolean) {
		this._hasChildren = value;
	}

	/**
	 * Setter isExpanded
	 * @param boolean value
	 */
	public set isExpanded(value: boolean) {
		this._isExpanded = value;
	}
}
