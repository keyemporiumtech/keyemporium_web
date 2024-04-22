import * as go from 'gojs';
import { DiagramBuilder } from '../../../core/diagram.builder';
import { ColorBrushModel } from '../../../core/model/color-brush.model';
import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
export class DoubleTreeUtility {
	static colorsBrush: Map<string, go.Brush>;
	// --------- props
	static colors: ColorBrushModel[] = [];
	static vertical: boolean = false;
	static shape: ShapeModel = {
		type: EnumFigureType.ARROTONDATO,
		background: DiagramBuilder.makeColorBrush({
			name: 'gray',
			colorStart: '#F5F5F5',
			colorEnd: '#F1F1F1',
		}),
		borderColor: '#D8D8D8',
	};
	static text: TextBlockModel = {
		font: 'bold 11px Helvetica, bold Arial, sans-serif',
	};

	static makeNodeTemplate(): go.Node {
		const $ = go.GraphObject.make;
		return $(
			go.Node,
			'Auto',
			{ isShadowed: true },
			// define the node's outer shape
			$(
				go.Shape,
				DoubleTreeUtility.shape.type,
				{
					fill: DoubleTreeUtility.shape.background,
					stroke: DoubleTreeUtility.shape.borderColor,
				}, // default fill is gray
				new go.Binding('fill', 'color'),
			),
			// define the node's text
			$(
				go.TextBlock,
				{ margin: 5, font: DoubleTreeUtility.text.font },
				new go.Binding('text', 'key'),
			),
		);
	}
}
