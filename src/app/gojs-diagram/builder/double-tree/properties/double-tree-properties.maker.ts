import { DiagramBuilder } from '../../../core/diagram.builder';
import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { DoubleTreeUtility } from '../utility/double-tree.utility';
import { DoubleTreeProperties } from './double-tree.properties';

export class DoubleTreePropertiesMaker {
	static setValues(properties?: DoubleTreeProperties) {
		if (properties) {
			if (properties.colors) {
				DoubleTreeUtility.colors = properties.colors;
			}
			if (properties.vertical) {
				DoubleTreeUtility.vertical = properties.vertical;
			}
		}
	}

	static setColorsBrush() {
		DoubleTreeUtility.colorsBrush = DiagramBuilder.makeColorsBrush(DoubleTreeUtility.colors);
	}

	static putShapeNode(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				DoubleTreeUtility.shape.type = shape.type;
			}
			if (shape.background) {
				DoubleTreeUtility.shape.background = shape.background;
			}
		}
	}

	static putTextNode(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				DoubleTreeUtility.text.font = text.font;
			}
		}
	}

	// -------------- DEFAULT
	static default(): DoubleTreeProperties {
		const properties: DoubleTreeProperties = {};
		properties.colors = [];
		properties.vertical = false;
		properties.shapeNode = {
			type: EnumFigureType.ARROTONDATO,
			background: DiagramBuilder.makeColorBrush({
				name: 'gray',
				colorStart: '#F5F5F5',
				colorEnd: '#F1F1F1',
			}),
			borderColor: '#D8D8D8',
		};
		properties.textNode = {
			font: 'bold 11px Helvetica, bold Arial, sans-serif',
		};
		return properties;
	}

	static reset() {
		this.setValues(this.default());
	}
}
