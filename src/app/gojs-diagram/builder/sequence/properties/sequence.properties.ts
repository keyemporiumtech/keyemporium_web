import { LinkModel } from '../../../core/model/link.model';
import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';

export interface SequenceProperties {
	shapeGroup?: ShapeModel;
	textStyleGroup?: TextBlockModel;
	linkStyle?: LinkModel;
	resizeColor?: string;
	shapeNode?: ShapeModel;
}
