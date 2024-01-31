import { ShapeModel } from '../../../core/model/shape.model';

export interface OrgTreeProperties {
	levelColors?: string[];
	shape?: ShapeModel;
	PATH_PIC?: string;
	textStylePrimary?: any;
	textStyleSecondary?: any;
	iconShape?: ShapeModel;
	editableText?: boolean;
}
