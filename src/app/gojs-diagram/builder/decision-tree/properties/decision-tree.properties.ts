import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';

export interface DecisionTreeProperties {
	linkColor?: string;
	shapeTooltip?: ShapeModel;
	textTooltip?: TextBlockModel;
	shapeDecision?: ShapeModel;
	textDecision?: TextBlockModel;
	shapePersonality?: ShapeModel;
	textPersonality?: TextBlockModel;
	textButton?: TextBlockModel;
	textButtonDecision1?: TextBlockModel;
	textButtonDecision2?: TextBlockModel;
}
