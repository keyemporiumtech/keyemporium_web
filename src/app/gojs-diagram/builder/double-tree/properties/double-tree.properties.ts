import { ColorBrushModel } from '../../../core/model/color-brush.model';
import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';

export interface DoubleTreeProperties {
	colors?: ColorBrushModel[];
	vertical?: boolean;
	shapeNode?: ShapeModel;
	textNode?: TextBlockModel;
}
