import { ShapeModel } from '../../../core/model/shape.model';
import { TextBlockModel } from '../../../core/model/text-block.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { UmlUtility } from '../utility/uml.utility';
import { UmlProperties } from './uml.properties';

export class UmlPropertiesMaker {
	static setValues(properties?: UmlProperties) {
		if (properties) {
			if (properties.shapeEntity) {
				this.putShapeEntity(properties.shapeEntity);
			}

			if (properties.colorProperties) {
				UmlUtility.colorProperties = properties.colorProperties;
			} else if (properties.shapeEntity && properties.shapeEntity.background) {
				UmlUtility.colorProperties = properties.shapeEntity.background;
			}

			if (properties.colorMethods) {
				UmlUtility.colorMethods = properties.colorMethods;
			} else if (properties.shapeEntity && properties.shapeEntity.background) {
				UmlUtility.colorMethods = properties.shapeEntity.background;
			}

			if (properties.textStyleClassName) {
				this.putTextStyleClass(properties.textStyleClassName);
			}

			if (properties.textStylePropertiesIntest) {
				this.putTextStyleProperties(properties.textStylePropertiesIntest);
			} else {
				this.putTextStyleProperties(properties.textStyleClassName);
			}

			if (properties.textStyleMethodsIntest) {
				this.putTextStyleMethods(properties.textStyleMethodsIntest);
			} else {
				this.putTextStyleMethods(properties.textStyleClassName);
			}

			// property
			if (properties.textStylePropertyVisibility) {
				this.putTextStylePropertyVisibility(properties.textStylePropertyVisibility);
			} else if (properties.textStylePropertyName) {
				this.putTextStylePropertyVisibility(properties.textStylePropertyName);
			}

			if (properties.textStylePropertyType) {
				this.putTextStylePropertyType(properties.textStylePropertyType);
			} else if (properties.textStylePropertyName) {
				this.putTextStylePropertyType(properties.textStylePropertyName);
			}

			if (properties.textStylePropertyName) {
				this.putTextStyleProperty(properties.textStylePropertyName);
			}

			// method
			if (properties.textStyleMethodVisibility) {
				this.putTextStyleMethodVisibility(properties.textStyleMethodVisibility);
			} else if (properties.textStyleMethodName) {
				this.putTextStyleMethodVisibility(properties.textStyleMethodName);
			}

			if (properties.textStyleMethodType) {
				this.putTextStyleMethodType(properties.textStyleMethodType);
			} else if (properties.textStyleMethodName) {
				this.putTextStyleMethodType(properties.textStyleMethodName);
			}

			if (properties.textStyleMethodName) {
				this.putTextStyleMethod(properties.textStyleMethodName);
			}
		}
	}

	static putShapeEntity(shape: ShapeModel) {
		if (shape) {
			if (shape.type) {
				UmlUtility.shapeEntity.type = shape.type;
			}
			if (shape.background) {
				UmlUtility.shapeEntity.background = shape.background;
			}
		}
	}

	static putTextStyleClass(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				UmlUtility.textStyleClassName.font = text.font;
			}
			if (text.textColor) {
				UmlUtility.textStyleClassName.textColor = text.textColor;
			}
		}
	}

	static putTextStyleProperties(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				UmlUtility.textStylePropertiesIntest.font = text.font;
			}
			if (text.textColor) {
				UmlUtility.textStylePropertiesIntest.textColor = text.textColor;
			}
		}
	}

	static putTextStyleMethods(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				UmlUtility.textStyleMethodsIntest.font = text.font;
			}
			if (text.textColor) {
				UmlUtility.textStyleMethodsIntest.textColor = text.textColor;
			}
		}
	}

	static putTextStylePropertyVisibility(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				UmlUtility.textStylePropertyVisibility.font = text.font;
			}
			if (text.textColor) {
				UmlUtility.textStylePropertyVisibility.textColor = text.textColor;
			}
		}
	}

	static putTextStylePropertyType(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				UmlUtility.textStylePropertyType.font = text.font;
			}
			if (text.textColor) {
				UmlUtility.textStylePropertyType.textColor = text.textColor;
			}
		}
	}

	static putTextStyleProperty(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				UmlUtility.textStylePropertyName.font = text.font;
			}
			if (text.textColor) {
				UmlUtility.textStylePropertyName.textColor = text.textColor;
			}
		}
	}

	static putTextStyleMethodVisibility(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				UmlUtility.textStyleMethodVisibility.font = text.font;
			}
			if (text.textColor) {
				UmlUtility.textStyleMethodVisibility.textColor = text.textColor;
			}
		}
	}

	static putTextStyleMethodType(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				UmlUtility.textStyleMethodType.font = text.font;
			}
			if (text.textColor) {
				UmlUtility.textStyleMethodType.textColor = text.textColor;
			}
		}
	}

	static putTextStyleMethod(text?: TextBlockModel) {
		if (text) {
			if (text.font) {
				UmlUtility.textStyleMethodName.font = text.font;
			}
			if (text.textColor) {
				UmlUtility.textStyleMethodName.textColor = text.textColor;
			}
		}
	}

	// -------------- DEFAULT
	static default(): UmlProperties {
		const properties: UmlProperties = {};
		properties.colorProperties = 'lightyellow';
		properties.colorMethods = 'lightyellow';

		properties.shapeEntity = {
			type: EnumFigureType.ARROTONDATO,
			background: 'lightyellow',
		};

		properties.textStyleClassName = {
			font: 'bold 11pt Lato, Helvetica, Arial, sans-serif',
			textColor: '#000000',
		};
		properties.textStylePropertiesIntest = {
			font: 'italic 10pt sans-serif',
			textColor: '#000000',
		};
		properties.textStyleMethodsIntest = {
			font: 'italic 10pt sans-serif',
			textColor: '#000000',
		};

		// private, public, protected ...
		properties.textStylePropertyVisibility = {
			font: 'bold 10pt sans-serif',
			textColor: '#000000',
		};
		// int, string, String ...
		properties.textStylePropertyType = {
			font: 'bold 10pt sans-serif',
			textColor: '#000000',
		};
		properties.textStylePropertyName = {
			font: '10pt sans-serif',
			textColor: '#000000',
		};

		// private, public, protected ...
		properties.textStyleMethodVisibility = {
			font: 'bold 10pt sans-serif',
			textColor: '#000000',
		};
		// int, string, String ...
		properties.textStyleMethodType = {
			font: 'bold 10pt sans-serif',
			textColor: '#000000',
		};
		properties.textStyleMethodName = {
			font: '10pt sans-serif',
			textColor: '#000000',
		};
		return properties;
	}

	static reset() {
		this.setValues(this.default());
	}
}
