import { EnumFigureType } from '../../enum/figure-type.enum';
import { GojsModel } from './gojs.model';

export interface ShapeModel extends GojsModel {
	type?: EnumFigureType;
	background?: string | go.Brush | any;
	borderColor?: string;
	borderSize?: number;
	defaultText?: string;
}
