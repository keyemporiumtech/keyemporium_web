import { LinkModel } from '../../../core/model/link.model';
import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';

export interface FlowchartProperties {
	textStyle?: TextBlockModel;
	shapeStart?: ShapeModel;
	shapeConditional?: ShapeModel;
	shapeStep?: ShapeModel;
	shapeEnd?: ShapeModel;
	shapeComment?: ShapeModel;
	shapeConditionalLink?: ShapeModel;
	textConditionalLink?: TextBlockModel;
	highlightPortColor?: string;
	linkHighlight?: LinkModel;
}
