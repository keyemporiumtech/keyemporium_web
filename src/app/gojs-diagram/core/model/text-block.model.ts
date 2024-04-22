import { GojsModel } from './gojs.model';

export interface TextBlockModel extends GojsModel {
	font?: string;
	textAlign?: 'center' | 'start' | 'end' | 'left' | 'right';
	textColor?: string;
	defaultText?: string;
	highlightColor?: string;
}
