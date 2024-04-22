import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';

export interface KanbanBoardProperties {
	startDate?: Date;
	noteColors?: string[];
	shapeGroup?: ShapeModel;
	textGroup?: TextBlockModel;
	shapeStatus?: ShapeModel;
	shapeNode?: ShapeModel;
	textNode?: TextBlockModel;
	textStatusSTOP?: { color?: string; text?: string };
	textStatusPROGRESS?: { color?: string; text?: string };
	textStatusCOMPLETE?: { color?: string; text?: string };
}
