import { LinkModel } from '../../../core/model/link.model';
import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { FlowchartUtility } from '../utility/flowchart.utility';
import { FlowchartProperties } from './flowchart.properties';

export class FlowchartPropertiesMaker {
	static setValues(properties?: FlowchartProperties) {
		if (properties) {
			if (properties.textStyle) {
				this.putTextStyle(properties.textConditionalLink);
			}

			if (properties.shapeStart) {
				this.putShape(properties.shapeStart, 'START');
			}
			if (properties.shapeConditional) {
				this.putShape(properties.shapeConditional, 'CONDITIONAL');
			}
			if (properties.shapeStep) {
				this.putShape(properties.shapeStep, 'STEP');
			}
			if (properties.shapeEnd) {
				this.putShape(properties.shapeEnd, 'END');
			}
			if (properties.shapeComment) {
				this.putShape(properties.shapeComment, 'COMMENT');
			}
			if (properties.textConditionalLink) {
				this.putTextConditionalLink(properties.textConditionalLink);
			}
			if (properties.shapeConditionalLink) {
				this.putShapeConditionalLink(properties.shapeConditionalLink);
			}
			if (properties.highlightPortColor) {
				FlowchartUtility.highlightPortColor = properties.highlightPortColor;
			}
			if (properties.linkHighlight) {
				this.putLinkHighlight(properties.linkHighlight);
			}
		}
	}

	static putTextStyle(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				FlowchartUtility.textStyle.font = text.font;
			}
			if (text.textColor) {
				FlowchartUtility.textStyle.textColor = text.textColor;
			}
		}
	}

	static putShape(shape?: ShapeModel, tp?: string) {
		let shapeTemplate: ShapeModel;
		switch (tp) {
			case 'START':
				shapeTemplate = FlowchartUtility.shapeStart;
				break;
			case 'CONDITIONAL':
				shapeTemplate = FlowchartUtility.shapeConditional;
				break;
			case 'STEP':
				shapeTemplate = FlowchartUtility.shapeStep;
				break;
			case 'END':
				shapeTemplate = FlowchartUtility.shapeEnd;
				break;
			case 'COMMENT':
				shapeTemplate = FlowchartUtility.shapeComment;
				break;
		}

		if (shape) {
			if (shape.type) {
				shapeTemplate.type = shape.type;
			}
			if (shape.background) {
				shapeTemplate.background = shape.background;
			}
			if (shape.borderColor) {
				shapeTemplate.borderColor = shape.borderColor;
			}
			if (shape.borderSize) {
				shapeTemplate.borderSize = shape.borderSize;
			}
		}
	}

	static putShapeConditionalLink(shape?: ShapeModel) {
		if (shape) {
			if (shape.type) {
				FlowchartUtility.shapeConditionalLink.type = shape.type;
			}
			if (shape.background) {
				FlowchartUtility.shapeConditionalLink.background = shape.background;
			}
			if (shape.borderColor) {
				FlowchartUtility.shapeConditionalLink.borderColor = shape.borderColor;
			}
			if (shape.borderSize) {
				FlowchartUtility.shapeConditionalLink.borderSize = shape.borderSize;
			}
		}
	}

	static putTextConditionalLink(text?: TextBlockModel) {
		if (text) {
			if (text.textAlign) {
				FlowchartUtility.textConditionalLink.textAlign = text.textAlign;
			}
			if (text.font) {
				FlowchartUtility.textConditionalLink.font = text.font;
			}
			if (text.textColor) {
				FlowchartUtility.textConditionalLink.textColor = text.textColor;
			}
		}
	}

	static putLinkHighlight(link?: LinkModel) {
		if (link) {
			if (link.linkColor) {
				FlowchartUtility.linkHighlight.linkColor = link.linkColor;
			}
			if (link.highlightColor) {
				FlowchartUtility.linkHighlight.highlightColor = link.highlightColor;
			}
			if (link.arrowColor) {
				FlowchartUtility.linkHighlight.arrowColor = link.arrowColor;
			}
			if (link.arrowSize) {
				FlowchartUtility.linkHighlight.arrowSize = link.arrowSize;
			}
			if (link.arrowType) {
				FlowchartUtility.linkHighlight.arrowType = link.arrowType;
			}
		}
	}

	// -------------- DEFAULT
	static default(): FlowchartProperties {
		const properties: FlowchartProperties = {};
		properties.textStyle = {
			font: 'bold 11pt Lato, Helvetica, Arial, sans-serif',
			textColor: '#F8F8F8',
		};

		properties.shapeStart = {
			type: EnumFigureType.CERCHIO,
			background: '#282c34',
			borderColor: '#09d3ac',
			borderSize: 3.5,
			defaultText: 'Start',
		};

		properties.shapeConditional = {
			type: EnumFigureType.ROMBO,
			background: '#282c34',
			borderColor: '#00A9C9',
			borderSize: 3.5,
			defaultText: 'If/Else',
		};

		properties.shapeStep = {
			type: EnumFigureType.RETTANGOLO,
			background: '#282c34',
			borderColor: '#00A9C9',
			borderSize: 3.5,
			defaultText: 'Step',
		};
		properties.shapeEnd = {
			type: EnumFigureType.CERCHIO,
			background: '#282c34',
			borderColor: '#DC3C00',
			borderSize: 3.5,
			defaultText: 'End',
		};
		properties.shapeComment = {
			type: EnumFigureType.FILE,
			background: '#282c34',
			borderColor: '#DEE0A3',
			borderSize: 3,
			defaultText: 'Comment',
		};

		properties.textConditionalLink = {
			defaultText: 'Yes',
			textAlign: 'center',
			font: '10pt helvetica, arial, sans-serif',
			textColor: '#333333',
		};
		properties.shapeConditionalLink = {
			type: EnumFigureType.ARROTONDATO,
			background: '#F8F8F8',
			borderSize: 0,
		};

		// static highlightPortColor = 'rgba(30,144,255,0.2)';
		properties.highlightPortColor = 'red';

		properties.linkHighlight = {
			linkColor: 'gray',
			highlightColor: 'dodgerblue',
			arrowColor: 'gray',
			arrowType: 'standard',
			arrowSize: 0,
		};
		return properties;
	}
	static reset() {
		this.setValues(this.default());
	}
}
