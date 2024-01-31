import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';

export interface UmlProperties {
	colorProperties?: string;
	colorMethods?: string;
	shapeEntity?: ShapeModel;
	textStyleClassName?: TextBlockModel;
	textStylePropertiesIntest?: TextBlockModel;
	textStyleMethodsIntest?: TextBlockModel;
	textStylePropertyVisibility?: TextBlockModel;
	textStylePropertyType?: TextBlockModel;
	textStylePropertyName?: TextBlockModel;
	textStyleMethodVisibility?: TextBlockModel;
	textStyleMethodType?: TextBlockModel;
	textStyleMethodName?: TextBlockModel;
}
