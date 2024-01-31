import { LinkModel } from '../../../core/model/link.model';
import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { SequenceUtility } from '../utility/sequence.utility';
import { SequenceProperties } from './sequence.properties';

export class SequencePropertiesMaker {
	static setValues(properties?: SequenceProperties) {
		if (properties) {
			if (properties.shapeGroup) {
				this.putShapeGroup(properties.shapeGroup);
			}

			if (properties.textStyleGroup) {
				this.putTextStyleGroup(properties.textStyleGroup);
			}

			if (properties.linkStyle) {
				this.putLinkStyle(properties.linkStyle);
			}

			if (properties.resizeColor) {
				SequenceUtility.resizeColor = properties.resizeColor;
			}

			if (properties.shapeNode) {
				this.putShapeNode(properties.shapeNode);
			}
		}
	}

	static putShapeGroup(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				SequenceUtility.shapeGroup.type = shape.type;
			}
			if (shape.background) {
				SequenceUtility.shapeGroup.background = shape.background;
			}
		}
	}

	static putTextStyleGroup(text: TextBlockModel) {
		if (text) {
			if (text.font) {
				SequenceUtility.textStyleGroup.font = text.font;
			}
		}
	}

	static putLinkStyle(link: LinkModel) {
		if (link) {
			if (link.font) {
				SequenceUtility.linkStyle.font = link.font;
			}
			if (link.linkColor) {
				SequenceUtility.linkStyle.linkColor = link.linkColor;
			}
			if (link.arrowType) {
				SequenceUtility.linkStyle.arrowType = link.arrowType;
			}
		}
	}

	static putShapeNode(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				SequenceUtility.shapeNode.type = shape.type;
			}
			if (shape.background) {
				SequenceUtility.shapeNode.background = shape.background;
			}
			if (shape.borderColor) {
				SequenceUtility.shapeNode.borderColor = shape.borderColor;
			}
		}
	}

	// -------------- DEFAULT
	static default(): SequenceProperties {
		const properties: SequenceProperties = {};
		properties.shapeGroup = {
			type: EnumFigureType.ARROTONDATO,
			background: '#bbdefb',
		};
		properties.textStyleGroup = {
			font: '400 10pt Source Sans Pro, sans-serif',
		};

		properties.shapeNode = {
			type: EnumFigureType.RETTANGOLO,
			background: 'white',
			borderColor: 'black',
		};

		properties.linkStyle = {
			font: '400 9pt Source Sans Pro, sans-serif',
			linkColor: 'gray',
			arrowType: 'OpenTriangle',
		};

		properties.resizeColor = 'yellow';
		return properties;
	}

	static reset() {
		this.setValues(this.default());
	}
}
