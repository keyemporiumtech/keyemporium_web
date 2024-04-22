import { TextBlockModel } from './text-block.model';

export interface LinkModel extends TextBlockModel {
	linkColor?: string;
	arrowColor?: string;
	arrowType?: string;
	arrowSize?: number;
}
