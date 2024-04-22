import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { DecisionTreeUtility } from '../utility/decision-tree.utility';
import { DecisionTreeProperties } from './decision-tree.properties';

export class DecisionTreePropertiesMaker {
	static setValues(properties?: DecisionTreeProperties) {
		if (properties) {
			if (properties.linkColor) {
				DecisionTreeUtility.linkColor = properties.linkColor;
			}

			if (properties.shapeTooltip) {
				this.putShapeTooltip(properties.shapeTooltip);
			}
			if (properties.textTooltip) {
				this.putTextTooltip(properties.textTooltip);
			}

			if (properties.shapeDecision) {
				this.putShapeDecision(properties.shapeDecision);
			}
			if (properties.textDecision) {
				this.putTextDecision(properties.textDecision);
			}

			if (properties.shapePersonality) {
				this.putShapePersonality(properties.shapePersonality);
			}
			if (properties.textPersonality) {
				this.putTextPersonality(properties.textPersonality);
			}

			if (properties.textButton) {
				this.putTextButton(properties.textButton);
			}
			if (properties.textButtonDecision1) {
				this.putTextButtonDecision1(properties.textButtonDecision1);
			}
			if (properties.textButtonDecision2) {
				this.putTextButtonDecision2(properties.textButtonDecision2);
			}
		}
	}

	static putShapeTooltip(shape: ShapeModel) {
		if (shape) {
			if (shape.borderColor) {
				DecisionTreeUtility.shapeTooltip.type = shape.type;
			}
			if (shape.background) {
				DecisionTreeUtility.shapeTooltip.background = shape.background;
			}
		}
	}

	static putTextTooltip(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				DecisionTreeUtility.textTooltip.font = text.font;
			}
		}
	}

	static putShapeDecision(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				DecisionTreeUtility.shapeDecision.type = shape.type;
			}
			if (shape.borderColor) {
				DecisionTreeUtility.shapeDecision.type = shape.type;
			}
			if (shape.background) {
				DecisionTreeUtility.shapeDecision.background = shape.background;
			}
		}
	}

	static putTextDecision(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				DecisionTreeUtility.textDecision.font = text.font;
			}
		}
	}

	static putShapePersonality(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				DecisionTreeUtility.shapePersonality.type = shape.type;
			}
			if (shape.borderColor) {
				DecisionTreeUtility.shapePersonality.type = shape.type;
			}
			if (shape.background) {
				DecisionTreeUtility.shapePersonality.background = shape.background;
			}
		}
	}

	static putTextPersonality(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				DecisionTreeUtility.textPersonality.font = text.font;
			}
		}
	}

	static putTextButton(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				DecisionTreeUtility.textButton.font = text.font;
			}
		}
	}

	static putTextButtonDecision1(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				DecisionTreeUtility.textButtonDecision1.font = text.font;
			}
		}
	}

	static putTextButtonDecision2(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				DecisionTreeUtility.textButtonDecision2.font = text.font;
			}
		}
	}

	// -------------- DEFAULT
	static default(): DecisionTreeProperties {
		const properties: DecisionTreeProperties = {};

		properties.linkColor = 'lightblue';
		properties.shapeTooltip = {
			background: 'whitesmoke',
			borderColor: 'lightgray',
		};
		properties.textTooltip = {
			font: '8pt sans-serif',
			textColor: '#000000',
		};

		properties.shapeDecision = {
			type: EnumFigureType.ARROTONDATO,
			background: 'whitesmoke',
			borderColor: 'lightgray',
		};
		properties.textDecision = {
			font: '30px Roboto, sans-serif',
			textColor: '#000000',
		};

		properties.textButton = {
			font: '500 16px Roboto, sans-serif',
			textColor: '#000000',
		};
		properties.textButtonDecision1 = {
			font: '500 16px Roboto, sans-serif',
			textColor: '#000000',
		};
		properties.textButtonDecision2 = {
			font: '500 16px Roboto, sans-serif',
			textColor: '#000000',
		};

		properties.shapePersonality = {
			type: EnumFigureType.RETTANGOLO,
			background: 'whitesmoke',
			borderColor: 'lightgray',
		};
		properties.textPersonality = {
			font: '13px Roboto, sans-serif',
			textColor: '#000000',
		};

		return properties;
	}

	static reset() {
		this.setValues(this.default());
	}
}
