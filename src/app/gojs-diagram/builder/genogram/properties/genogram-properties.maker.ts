import { GenogramUtility } from '../utility/genogram.utility';
import { GenogramProperties } from './genogram-properties';

export class GenogramPropertiesMaker {
	static setValues(properties?: GenogramProperties) {
		if (properties) {
			if (properties.maleColor) {
				GenogramUtility.maleColor = properties.maleColor;
			}
			if (properties.femaleColor) {
				GenogramUtility.femaleColor = properties.femaleColor;
			}
			if (properties.diagramType) {
				GenogramUtility.diagramType = properties.diagramType;
			}
			if (properties.linkType) {
				GenogramUtility.linkType = properties.linkType;
			}
			if (properties.parentChildColor) {
				GenogramUtility.parentChildColor = properties.parentChildColor;
			}
			if (properties.spouseColor) {
				GenogramUtility.spouseColor = properties.spouseColor;
			}
			if (properties.brotherColor) {
				GenogramUtility.brotherColor = properties.brotherColor;
			}
		}
	}

	// -------------- DEFAULT
	static default(): GenogramProperties {
		const properties: GenogramProperties = {};
		properties.diagramType = 'ARLECCHINO';
		properties.linkType = 'SIMPLE';
		properties.maleColor = '#90CAF9';
		properties.femaleColor = '#F48FB1';
		properties.parentChildColor = '#2672EC';
		properties.spouseColor = '#AC193D';
		properties.brotherColor = '#00af54';
		return properties;
	}

	static reset() {
		this.setValues(this.default());
	}
}
