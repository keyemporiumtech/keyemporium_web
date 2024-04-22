import * as go from 'gojs';
import { EnumFigureType } from '../../enum/figure-type.enum';

export interface GojsNodeDataModel {
	key?: string | number | undefined;
	width?: number;
	height?: number;
	background?: string;
	type?: EnumFigureType | string;
	borderColor?: string;
	borderSize?: number;
	borderCap?: string;
	borderJoin?: string;
	posizion?: string; // example 5 20
	margin?: go.Margin;
	// text
	font?: string;
	possibleValues?: string[];
	multiline?: boolean;
	lineThrough?: boolean;
	underline?: boolean;
	spacing?: number;
	text?: string;
	textAlign?: 'left' | 'right' | 'center' | 'end' | 'start';
	textMargin?: go.Margin;
	// group
	isGroup?: boolean;
	group?: string;
	// image
	img?: string;
	imgMargin?: go.Margin;
	imgWidth?: number;
	imgHeight?: number;

	// personalizations
	payloads?: any;
}
