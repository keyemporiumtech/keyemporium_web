import { ShapeModel } from '../../../core/model/shape.model';
import { EnumFigureType } from '../../../enum/figure-type.enum';
import { OrgTreeUtility } from '../utility/org-tree.utility';
import { OrgTreeProperties } from './org-tree.properties';

export class OrgTreePropertiesMaker {
	static setValues(properties?: OrgTreeProperties) {
		if (properties) {
			if (properties.levelColors) {
				OrgTreeUtility.levelColors = properties.levelColors;
			}
			if (properties.shape) {
				this.putShape(properties.shape);
			}
			if (properties.textStylePrimary) {
				OrgTreeUtility.textStylePrimary = properties.textStylePrimary;
			}
			if (properties.PATH_PIC) {
				OrgTreeUtility.PATH_PIC = properties.PATH_PIC;
			}
			if (properties.textStyleSecondary) {
				OrgTreeUtility.textStyleSecondary = properties.textStyleSecondary;
			}
			if (properties.iconShape) {
				this.putShape(properties.iconShape);
			}
			if (properties.editableText) {
				OrgTreeUtility.editableText = properties.editableText;
			}
		}
	}
	static putShape(shape?: ShapeModel) {
		if (shape) {
			if (shape.type) {
				OrgTreeUtility.shape.type = shape.type;
			}
			if (shape.background) {
				OrgTreeUtility.shape.background = shape.background;
			}
			if (shape.borderColor) {
				OrgTreeUtility.shape.borderColor = shape.borderColor;
			}
			if (shape.borderSize) {
				OrgTreeUtility.shape.borderSize = shape.borderSize;
			}
		}
	}

	static putIconShape(shape?: ShapeModel) {
		if (shape) {
			if (shape.type) {
				OrgTreeUtility.iconShape.type = shape.type;
			}
			if (shape.background) {
				OrgTreeUtility.iconShape.background = shape.background;
			}
			if (shape.borderColor) {
				OrgTreeUtility.iconShape.borderColor = shape.borderColor;
			}
			if (shape.borderSize) {
				OrgTreeUtility.iconShape.borderSize = shape.borderSize;
			}
		}
	}

	// -------------- DEFAULT
	static default(): OrgTreeProperties {
		const properties: OrgTreeProperties = {};
		properties.levelColors = [
			'#AC193D',
			'#2672EC',
			'#8C0095',
			'#5133AB',
			'#008299',
			'#D24726',
			'#008A00',
			'#094AB2',
		];
		properties.shape = {
			type: EnumFigureType.RETTANGOLO,
			background: '#333333',
			borderColor: 'white',
			borderSize: 3.5,
		};

		properties.PATH_PIC = 'assets/images/orgTree';
		properties.textStylePrimary = { font: '12pt Segoe UI,sans-serif', stroke: 'white' };
		properties.textStyleSecondary = { font: '9pt  Segoe UI,sans-serif', stroke: 'white' };

		properties.iconShape = {
			type: EnumFigureType.CERCHIO,
			background: '#6FB583',
			borderColor: 'white',
			borderSize: 0.5,
		};

		properties.editableText = false;
		return properties;
	}

	static reset() {
		this.setValues(this.default());
	}
}
