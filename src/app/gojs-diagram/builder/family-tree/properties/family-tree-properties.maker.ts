import { EnumFigureType } from '../../../enum/figure-type.enum';
import { FamilyTreeUtility } from '../utility/family-tree.utility';
import { FamilyTreeProperties } from './family-tree-properties';

export class FamilyTreePropertiesMaker {
	static setValues(properties?: FamilyTreeProperties) {
		if (!properties) {
			properties = this.default();
		}
		if (properties) {
			if (properties.maleColor) {
				FamilyTreeUtility.maleColor = properties.maleColor;
			}
			if (properties.femaleColor) {
				FamilyTreeUtility.femaleColor = properties.femaleColor;
			}
			if (properties.typeShape) {
				FamilyTreeUtility.typeShape = properties.typeShape;
			}
			if (properties.textMales) {
				FamilyTreeUtility.textMales = properties.textMales;
			}
			if (properties.textFemales) {
				FamilyTreeUtility.textFemales = properties.textFemales;
			}
			if (properties.parentChildColor) {
				FamilyTreeUtility.parentChildColor = properties.parentChildColor;
			}
			if (properties.spouseColor) {
				FamilyTreeUtility.spouseColor = properties.spouseColor;
			}
			if (properties.brotherColor) {
				FamilyTreeUtility.brotherColor = properties.brotherColor;
			}
		}
	}

	// -------------- DEFAULT
	static default(): FamilyTreeProperties {
		const properties: FamilyTreeProperties = {};

		properties.maleColor = '#90CAF9';
		properties.femaleColor = '#F48FB1';
		properties.typeShape = EnumFigureType.RETTANGOLO;
		properties.textMales = 'Males';
		properties.textFemales = 'Females';
		properties.parentChildColor = '#2672EC';
		properties.spouseColor = '#AC193D';
		properties.brotherColor = '#00af54';

		return properties;
	}

	static reset() {
		this.setValues(this.default());
	}
}
