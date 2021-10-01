import { BaseTreeApiConverter } from '../../cakeutils/base/base-tree-api.converter';

export class TreeConverter extends BaseTreeApiConverter<any> {
	fieldForId(): string {
		return 'id';
	}
	fieldForName(): string {
		return 'name';
	}
	fieldForChildren(): string {
		return 'children';
	}
	fieldForHasChildren(): string {
		return 'hasChildren';
	}
	fieldForIsExpanded(): string {
		return 'isExpandend';
	}
	public getEmptyDto() {
		return {};
	}
}
