import { GanttUtility } from '../utility/gantt.utility';
import { GanttProperties } from './gantt.properties';

export class GanttPropertiesMaker {
	static setValues(properties?: GanttProperties) {
		if (properties && properties.startDate) {
			GanttUtility.StartDate = properties.startDate;
		}
	}

	// -------------- DEFAULT
	static default(): GanttProperties {
		const properties: GanttProperties = {};
		properties.startDate = new Date();
		return properties;
	}

	static reset() {
		this.setValues(this.default());
	}
}
