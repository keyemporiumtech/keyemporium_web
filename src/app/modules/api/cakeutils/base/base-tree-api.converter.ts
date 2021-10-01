import { ApiDTO } from './api.dto';
import { BaseTreeConverter, TreeHtmlModel } from '@ddc/kit';

export abstract class BaseTreeApiConverter<D extends ApiDTO> extends BaseTreeConverter<D> {
	getEmptyIfNull: boolean;
	constructor(getEmptyIfNull?: boolean) {
		super();
		this.getEmptyIfNull = getEmptyIfNull;
	}

	abstract fieldForId(): string;
	abstract fieldForName(): string;
	abstract fieldForChildren(): string;
	abstract fieldForHasChildren(): string;
	abstract fieldForIsExpanded(): string;

	public convertToModel(dto?: any): TreeHtmlModel {
		if (!dto) {
			return this.getEmptyIfNull ? this.getEmptyModel() : undefined;
		}
		const model = new TreeHtmlModel();
		model.id = dto[this.fieldForId() ? this.fieldForId() : 'id'];
		model.name = dto[this.fieldForName() ? this.fieldForName() : 'name'];
		model.hasChildren =
			dto[this.fieldForHasChildren() ? this.fieldForHasChildren() : 'hasChildren'];
		model.isExpanded = dto[this.fieldForIsExpanded() ? this.fieldForIsExpanded() : 'isExpanded'];
		model.children = this.convertToModelList(
			dto[this.fieldForChildren() ? this.fieldForChildren() : 'children'],
		);
		return model;
	}
	public convertToDto(model?: TreeHtmlModel): any {
		if (!model) {
			return this.getEmptyDto();
		}
		const dto: any = {};
		dto[this.fieldForId() ? this.fieldForId() : 'id'] = model.id;
		dto[this.fieldForName() ? this.fieldForName() : 'name'] = model.name;
		dto[this.fieldForHasChildren() ? this.fieldForHasChildren() : 'hasChildren'] =
			model.hasChildren;
		dto[this.fieldForIsExpanded() ? this.fieldForIsExpanded() : 'isExpanded'] = model.isExpanded;
		dto[this.fieldForChildren() ? this.fieldForChildren() : 'children'] = this.convertToDtoList(
			model.children,
		);
		return dto;
	}
	public getEmptyModel(): TreeHtmlModel {
		throw new TreeHtmlModel();
	}
}
