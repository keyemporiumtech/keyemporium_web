import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';

export interface PlayerStyleModel {
	shape?: ShapeModel;
	text?: TextBlockModel;
	shapeScore?: ShapeModel;
	textScore?: TextBlockModel;
	shapeWin?: ShapeModel;
	textWin?: TextBlockModel;
	shapeScoreWin?: ShapeModel;
	textScoreWin?: TextBlockModel;
}
